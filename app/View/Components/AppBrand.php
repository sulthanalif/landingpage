<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class AppBrand extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return <<<'HTML'
                <a href="/dashboard" wire:navigate>
                    <!-- Hidden when collapsed -->
                    <div {{ $attributes->class(["hidden-when-collapsed"]) }}>
                        <div class="flex items-center gap-2">
                            <img src="{{ asset('img/logo.png') }}" alt="" style="width: 250px; height: auto;">
                        </div>
                    </div>

                    <!-- Display when collapsed -->
                    <div class="display-when-collapsed hidden mx-5 mt-4 lg:mb-6 h-[28px]">
                        <x-icon name="s-square-3-stack-3d" class="w-6 -mb-1 text-purple-500" />
                    </div>
                </a>
            HTML;
    }
}
