<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    protected $table = 'vouchers';

    protected $fillable = [
        'campaign_id',
        'code',
        'percentage',
        'status',
        'is_claimed'
    ];

    public function generateCode(int $number = 6): string
    {
        $string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $alias = '';

        if ($this->campaign && !empty($this->campaign->name)) {
            $words = explode(' ', $this->campaign->name);
            $alias = implode('', array_map(fn($word) => $word[0], $words));
        }

        return strtoupper($alias . substr(str_shuffle($string), 0, $number));
    }


    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->code = $model->generateCode(6);
        });
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }
}
