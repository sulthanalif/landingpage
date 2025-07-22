<?php

namespace App;

use Exception;
use Throwable;
use Illuminate\Support\Str;
// use Intervention\Image\Facades\Image;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;

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


                $record->fill($this->only(array_keys(array_diff_key($validationRules, array_flip(['image', 'logo', 'file', 'icon'])))));
                $record->save();
            } else {
                $record = new $this->model;

                if ($beforeSave) {
                    $beforeSave($record, $this);
                }

                $record->fill($this->only(array_keys(array_diff_key($validationRules, array_flip(['image', 'logo', 'file', 'icon'])))));
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

            DB::commit();

            if ($afterDelete) {
                $afterDelete($this->recordId, $this);
            }

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

    /**
     * Upload image dan convert ke WebP.
     *
     * @param UploadedFile $image
     * @param string|null $folder
     * @param int $quality
     * @return string path relatif ke public storage
     */
    public function uploadImage(UploadedFile $image, ?string $folder = null, int $quality = 75): string
    {
        $folder = trim($folder ?? '', '/');
        $filename = Str::uuid() . '.webp';
        $path = $folder ? "images/{$folder}/{$filename}" : "images/{$filename}";

        // Buat manager-nya
        $manager = new ImageManager(new Driver());

        // Baca dan resize/encode ke WebP
        $encoded = $manager->read($image->getRealPath())
            ->toWebp(quality: $quality);

        Storage::disk('public')->put($path, (string) $encoded);

        return $path;
    }

    /**
     * Hapus image dari disk public.
     *
     * @param string $path
     * @return void
     */
    public function deleteImage(string $path): void
    {
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
