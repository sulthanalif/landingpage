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
            ['name' => 'hrd'],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }

        //permission
        $permissions = [
            'dashboard',
            'master',
            'user-page',
            'user-create',
            'user-edit',
            'user-delete',
            'category-page',
            'category-create',
            'category-edit',
            'category-delete',
            'teacher-page',
            'teacher-create',
            'teacher-edit',
            'teacher-delete',
            'activity-page',
            'activity-create',
            'activity-edit',
            'activity-delete',
            'question-page',
            'question-create',
            'question-edit',
            'question-delete',
            'post-page',
            'post-create',
            'post-edit',
            'post-delete',
            'mail-page',
            'mail-show',
            'mail-delete',
            'enrollment-page',
            'enrollment-show',
            'enrollment-delete',
            'calendar-page',
            'calendar-create',
            'calendar-edit',
            'calendar-delete',
            'wcu-page',
            'wcu-create',
            'wcu-edit',
            'wcu-delete',
            'accreditation-page',
            'accreditation-create',
            'accreditation-edit',
            'accreditation-delete',
            'tuition-fees-page',
            'tuition-fees-create',
            'tuition-fees-edit',
            'tuition-fees-delete',
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
        $adminPermissions = [
            'dashboard',
            'master',
            'category-page',
            'category-create',
            'category-edit',
            'category-delete',
            'post-page',
            'post-create',
            'post-edit',
            'post-delete',
            'mail-page',
            'mail-show',
            'mail-delete',
        ];
        $admin->givePermissionTo($adminPermissions);

        $marketing = Role::findByName('marketing');
        $marketingPermissions = [
            'dashboard',
            'master',
            'post-page',
            'post-create',
            'post-edit',
            'post-delete',
            'category-page',
            'category-create',
            'category-edit',
            'category-delete',
        ];
        $marketing->givePermissionTo($marketingPermissions);

        $hrd = Role::findByName('hrd');
        $hrdPermissions = [
            'dashboard',
            'master',
            'mail-page',
            'mail-show',
        ];
        $hrd->givePermissionTo($hrdPermissions);

        $users = [
            ['name' => 'Super Admin', 'email' => 'superadmin@gmail.com', 'password' => Hash::make('password'), 'role' => 'super-admin'],
            ['name' => 'Admin', 'email' => 'admin@gmail.com', 'password' => Hash::make('password'), 'role' => 'admin'],
            ['name' => 'Marketing', 'email' => 'marketing@gmail.com', 'password' => Hash::make('password'), 'role' => 'marketing'],
            ['name' => 'HRD', 'email' => 'hrd@gmail.com', 'password' => Hash::make('password'), 'role' => 'hrd'],
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
