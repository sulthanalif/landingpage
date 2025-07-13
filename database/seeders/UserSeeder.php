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
            'chart-student-registrations',
            'chart-career-registrations',
            // 'chart-careers',
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
            'career-page',
            'career-create',
            'career-edit',
            'career-delete',
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
            'discount-page',
            'discount-create',
            'discount-edit',
            'discount-delete',
            'facility-page',
            'facility-create',
            'facility-edit',
            'facility-delete',
            'campaign-page',
            'campaign-create',
            'campaign-edit',
            'campaign-delete',
            'extra-page',
            'extra-create',
            'extra-edit',
            'extra-delete',
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
            'chart-student-registrations',
            'chart-career-registrations',
            // 'chart-careers',
            'master',
            'facility-page',
            'facility-create',
            'facility-edit',
            'facility-delete',
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
            'career-page',
            'career-create',
            'career-edit',
            'career-delete',
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
            'extra-page',
            'extra-create',
            'extra-edit',
            'extra-delete',
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
            'mail-page',
            'mail-show',
            'campaign-page',
            'campaign-create',
            'campaign-edit',
            'campaign-delete',
        ];
        $marketing->givePermissionTo($marketingPermissions);

        $hrd = Role::findByName('hrd');
        $hrdPermissions = [
            'dashboard',
            'chart-career-registrations',
            // 'chart-careers',
            'master',
            'mail-page',
            'mail-show',
            'career-page',
            'career-create',
            'career-edit',
            'career-delete',
            'teacher-page',
            'teacher-create',
            'teacher-edit',
            'teacher-delete',
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
