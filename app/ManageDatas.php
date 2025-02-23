<?php

namespace App;


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

trait ManageDatas
{
    public function save($model, $data, $id) {
        try {
            DB::beginTransaction();
            if ($model->exists) {
                $model->update($data);
            } else {
                $model->fill($data);
                $model->save();
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::channel('debug')->error($e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'code' => $e->getCode(),
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }
}
