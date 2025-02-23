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
            'news-page',
            'news-create',
            'news-edit',
            'news-delete',
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
        $admin->givePermissionTo('news-page');
        $admin->givePermissionTo('news-create');
        $admin->givePermissionTo('news-edit');
        $admin->givePermissionTo('news-delete');

        $marketing = Role::findByName('marketing');
        $marketing->givePermissionTo('dahsboard');
        $marketing->givePermissionTo('master');
        $marketing->givePermissionTo('news-page');
        $marketing->givePermissionTo('news-create');
        $marketing->givePermissionTo('news-edit');
        $marketing->givePermissionTo('news-delete');
        $marketing->givePermissionTo('category-page');
        $marketing->givePermissionTo('category-create');
        $marketing->givePermissionTo('category-edit');
        $marketing->givePermissionTo('category-delete');

        $users = [
            ['name' => 'Super Admin', 'email' => 'superadmin@gmail.com', 'password' => Hash::make('password'), 'role' => 'super-admin'],
            ['name' => 'Admin', 'email' => 'admin@gmail.com', 'password' => Hash::make('password'), 'role' => 'admin'],
            ['name' => 'Marketing 1', 'email' => 'marketing1@gmail.com', 'password' => Hash::make('password'), 'role' => 'marketing'],
            ['name' => 'Marketing 2', 'email' => 'marketing2@gmail.com', 'password' => Hash::make('password'), 'role' => 'marketing'],
            ['name' => 'Marketing 3', 'email' => 'marketing3@gmail.com', 'password' => Hash::make('password'), 'role' => 'marketing'],
            ['name' => 'Marketing 4', 'email' => 'marketing4@gmail.com', 'password' => Hash::make('password'), 'role' => 'marketing'],
            ['name' => 'Marketing 5', 'email' => 'marketing5@gmail.com', 'password' => Hash::make('password'), 'role' => 'marketing'],
            ['name' => 'Marketing 6', 'email' => 'marketing6@gmail.com', 'password' => Hash::make('password'), 'role' => 'marketing'],
            ['name' => 'Marketing 7', 'email' => 'marketing7@gmail.com', 'password' => Hash::make('password'), 'role' => 'marketing'],
            ['name' => 'Marketing 8', 'email' => 'marketing8@gmail.com', 'password' => Hash::make('password'), 'role' => 'marketing'],
            ['name' => 'Marketing 9', 'email' => 'marketing9@gmail.com', 'password' => Hash::make('password'), 'role' => 'marketing'],
            ['name' => 'Marketing 10', 'email' => 'marketing10@gmail.com', 'password' => Hash::make('password'), 'role' => 'marketing'],
            ['name' => 'Marketing 11', 'email' => 'marketing11@gmail.com', 'password' => Hash::make('password'), 'role' => 'marketing'],
            ['name' => 'Marketing 12', 'email' => 'marketing12@gmail.com', 'password' => Hash::make('password'), 'role' => 'marketing'],
            ['name' => 'Marketing 13', 'email' => 'marketing13@gmail.com', 'password' => Hash::make('password'), 'role' => 'marketing'],
            ['name' => 'Marketing 14', 'email' => 'marketing14@gmail.com', 'password' => Hash::make('password'), 'role' => 'marketing'],
            ['name' => 'Marketing 15', 'email' => 'marketing15@gmail.com', 'password' => Hash::make('password'), 'role' => 'marketing'],
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
