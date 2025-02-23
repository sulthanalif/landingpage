<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //role
        $roles = [
            ['name' => 'super-admin'],
            ['name' => 'admin'],
            ['name' => 'marketing'],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }

        //permission
        $permissions = [
            'dahsboard',
            'master',
            'user-page',
            'user-create',
            'user-edit',
            'user-delete',
            'category-page',
            'category-create',
            'category-edit',
            'category-delete',
            'post-page',
            'post-create',
            'post-edit',
            'post-delete',
            'options',
            'role-page',
            'permission-page',
            'log-viewer',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $superAdmin = Role::findByName('super-admin');
        $superAdmin->givePermissionTo(Permission::all());

        $admin = Role::findByName('admin');
        $admin->givePermissionTo('dahsboard');
        $admin->givePermissionTo('master');
        $admin->givePermissionTo('category-page');
        $admin->givePermissionTo('category-create');
        $admin->givePermissionTo('category-edit');
        $admin->givePermissionTo('category-delete');
        $admin->givePermissionTo('post-page');
        $admin->givePermissionTo('post-create');
        $admin->givePermissionTo('post-edit');
        $admin->givePermissionTo('post-delete');

        $marketing = Role::findByName('marketing');
        $marketing->givePermissionTo('dahsboard');
        $marketing->givePermissionTo('master');
        $marketing->givePermissionTo('post-page');
        $marketing->givePermissionTo('post-create');
        $marketing->givePermissionTo('post-edit');
        $marketing->givePermissionTo('post-delete');
        $marketing->givePermissionTo('category-page');
        $marketing->givePermissionTo('category-create');
        $marketing->givePermissionTo('category-edit');
        $marketing->givePermissionTo('category-delete');

        $users = [
            ['name' => 'Super Admin', 'email' => 'superadmin@gmail.com', 'password' => Hash::make('password'), 'role' => 'super-admin'],
            ['name' => 'Admin', 'email' => 'admin@gmail.com', 'password' => Hash::make('password'), 'role' => 'admin'],
            ['name' => 'Marketing', 'email' => 'marketing@gmail.com', 'password' => Hash::make('password'), 'role' => 'marketing'],
        ];

        foreach ($users as $user) {
            $newUser = User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => $user['password'],
            ]);

            $newUser->assignRole($user['role']);
        }
    }
}
