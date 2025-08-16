<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->get();

        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'role' => 'required|string|exists:roles,name',
            'status' => 'required|string',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validatedData['first_name'] . ' ' . $validatedData['last_name'],
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
            'phone' => $validatedData['phone'],
            'address' => $validatedData['address'],
            'city' => $validatedData['city'],
            'notes' => $validatedData['notes'],
            'status' => $validatedData['status'],
            'password' => Hash::make($validatedData['password']),
        ]);

        $user->assignRole($validatedData['role']);

        return response()->json($user, 201);
    }

    public function show(User $user)
    {
        return response()->json($user->load('roles'));
    }
    public function update(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'role' => 'required|string|exists:roles,name',
            'status' => 'required|string',
            'password' => 'nullable|string|min:8',
        ]);

        $user->update([
            'name' => $validatedData['first_name'] . ' ' . $validatedData['last_name'],
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
            'phone' => $validatedData['phone'],
            'address' => $validatedData['address'],
            'city' => $validatedData['city'],
            'notes' => $validatedData['notes'],
            'status' => $validatedData['status'],
        ]);

        if (!empty($validatedData['password'])) {
            $user->password = Hash::make($validatedData['password']);
            $user->save();
        }

        $user->syncRoles([$validatedData['role']]);

        return response()->json($user->load('roles'));
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'لا يمكنك حذف حسابك الخاص.'], 403);
        }

        $user->delete();

        return response()->json(null, 204); // 204 No Content
    }
    public function getRentals(User $user)
    {
        $rentals = $user->rentals()->latest()->get();
        return response()->json($rentals);
    }
}
