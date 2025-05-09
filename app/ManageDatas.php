<?php

namespace App;

use Exception;
use Throwable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

trait ManageDatas
{
    public $recordId = null;
    public $model;

    public function setModel($model): void
    {
        $this->model = $model;
    }

    public function unsetModel(): void
    {
        $this->model = null;
    }

    public function setRecordId($id): void
    {
        $this->recordId = $id;
    }

    public function unsetRecordId(): void
    {
        $this->recordId = null;
    }

    public function saveOrUpdate(array $validationRules, bool $toast = true, callable $beforeSave = null, callable $afterSave = null): void
    {
        $this->validate($validationRules);

        try {
            DB::beginTransaction();

            if ($this->recordId) {
                $record = $this->model->find($this->recordId);
                if (!$record) {
                    throw Log::alert("Record not found");
                }

                if ($beforeSave) {
                    $beforeSave($record, $this);
                }


                $record->fill($this->only(array_keys(array_diff_key($validationRules, array_flip(['image', 'logo'])))));
                $record->save();
            } else {
                $record = new $this->model;

                if ($beforeSave) {
                    $beforeSave($record, $this);
                }

                $record->fill($this->only(array_keys(array_diff_key($validationRules, array_flip(['image', 'logo'])))));
                $record->save();
            }
            DB::commit();

            if ($afterSave) {
                $afterSave($record, $this);
            }

            if($toast) {
                $this->success($this->recordId ? 'Data updated.' : 'Data created.', position: 'toast-bottom');
            }
            $this->myModal = false;
        } catch (Throwable $th) {
            DB::rollBack();
            $this->error('Terjadi Kesalahan Pada Sistem', position: 'toast-bottom');
            Log::channel('debug')->warning("message: " . $th->getMessage()." file: " . $th->getFile()." line: " . $th->getLine()." trace: " . $th->getTraceAsString());
        }
    }

    public function deleteData(callable $beforeDelete = null, callable $afterDelete = null): void
    {
        try {
            DB::beginTransaction();

            if ($beforeDelete) {
                $beforeDelete($this->recordId, $this);
            }

            $record = $this->model->find($this->recordId);
            if (!$record) {
                throw Log::channel('debug')->alert("Record not found");
            }

            if ($record->code) {
                $record->code = '#@#'.$record->code.'#@#';
                $record->save();
            }

            $record->delete();

            if ($afterDelete) {
                $afterDelete($this->recordId, $this);
            }

            DB::commit();
            $this->success('Data deleted.', position: 'toast-bottom');
        } catch (Throwable $th) {
            DB::rollBack();
            Log::channel('debug')->warning("An error occurred: " . $th->getMessage()." file: " . $th->getFile()." line: " . $th->getLine()." trace: " . $th->getTraceAsString());
        }
    }

    private function changeStatusData(): void
    {
        try {
            DB::beginTransaction();
            $record = $this->model->find($this->recordId);
            if (!$record) {
                throw Log::alert("Record not found");
            }
            $record->status = !$record->status;
            $record->save();
            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
            Log::channel('debug')->warning("An error occurred: " . $e->getMessage()." file: " . $e->getFile()." line: " . $e->getLine()." trace: " . $e->getTraceAsString());
        }
    }

    private function uploadImage($image, $folder = null): string
    {
        return $image->store('images/'. $folder, 'public');
    }

    private function deleteImage($image): void
    {
        Storage::disk('public')->delete($image);
    }
}
