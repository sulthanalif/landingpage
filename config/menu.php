<?php

return [
    [
        'type' => 'item',
        'can' => 'dashboard',
        'title' => 'Dashboard',
        'icon' => 'o-home',
        'link' => 'dashboard'
    ],
    [
        'type' => 'sub',
        'can' => 'master',
        'title' => 'Master Data',
        'icon' => 'o-cog',
        'submenu' => [
            [
                'can' => 'category-page',
                'title' => 'Categories',
                'icon' => 'o-tag',
                'link' => 'category'
            ],
            [
                'can' => 'post-page',
                'title' => 'Posts',
                'icon' => 'o-paper-airplane',
                'link' => 'post'
            ],
            [
                'can' => 'activity-page',
                'title' => 'Activities',
                'icon' => 'o-camera',
                'link' => 'activity'
            ],
            [
                'can' => 'facility-page',
                'title' => 'Facilities',
                'icon' => 'o-cube',
                'link' => 'facility'
            ],
            [
                'can' => 'extra-page',
                'title' => 'Extracurricular',
                'icon' => 'o-paint-brush',
                'link' => 'extra'
            ],
            [
                'can' => 'wcu-page',
                'title' => 'WCU',
                'icon' => 'o-question-mark-circle',
                'link' => 'wcu'
            ],
            [
                'can' => 'question-page',
                'title' => 'Questions',
                'icon' => 'o-question-mark-circle',
                'link' => 'question'
            ],
            [
                'can' => 'calendar-page',
                'title' => 'Calendar',
                'icon' => 'o-calendar',
                'link' => 'calendar'
            ],
            [
                'can' => 'accreditation-page',
                'title' => 'Accreditation',
                'icon' => 'o-clipboard-document-check',
                'link' => 'accreditation'
            ],
            [
                'can' => 'tuition-fees-page',
                'title' => 'Tuition Fees',
                'icon' => 'o-document-currency-dollar',
                'link' => 'tuition-fees'
            ],
            [
                'can' => 'discount-page',
                'title' => 'Discounts',
                'icon' => 'o-percent-badge',
                'link' => 'discount'
            ],
            [
                'can' => 'campaign-page',
                'title' => 'Campaigns',
                'icon' => 'o-megaphone',
                'link' => 'campaign'
            ],
            [
                'can' => 'career-page',
                'title' => 'Careers',
                'icon' => 'o-briefcase',
                'link' => 'career'
            ],
            [
                'can' => 'teacher-page',
                'title' => 'Teachers',
                'icon' => 'o-users',
                'link' => 'teacher'
            ],
            [
                'can' => 'user-page',
                'title' => 'Users',
                'icon' => 'o-users',
                'link' => 'user'
            ],
        ]
    ],

    [
        'type' => 'item',
        'can' => 'mail-page',
        'title' => 'Mail Box',
        'icon' => 'o-envelope',
        'link' => 'mail'
    ],
    [
        'type' => 'item',
        'can' => 'enrollment-page',
        'title' => 'Student Registration',
        'icon' => 'o-user-plus',
        'link' => 'enrollment'
    ],
    // [
    //     'type' => 'item',
    //     'can' => 'career-page',
    //     'title' => 'Career Registration',
    //     'icon' => 'o-user-plus',
    //     'link' => 'career.register.superadmin',
    // ],
];
