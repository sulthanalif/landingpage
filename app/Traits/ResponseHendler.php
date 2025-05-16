<?php

namespace App\Traits;

trait ResponseHendler
{
    public function successResponse($data = null, $code = 200, $message = null)
    {
        $responseParams = ["status" => true];

        if ($message){ $responseParams["message"] = $message;}
        if ($data){ $responseParams["data"] = $data;}

        return response()->json($responseParams, $code);
    }

    public function errorResponse($exception)
    {
        \Log::channel('api')->info($exception);
        try {
            if(!is_int($exception->getCode()) || $exception->getCode() <= 0) {
                throw null;
            }
            $code = $exception->getCode() ?? 500;
        } catch (\Throwable $th) {
            $code = 500;
        }

        return response()->json([
            "status" => false,
            "message" => $exception->getMessage()
        ], $code);
    }

    public function invalidResponse($invalids)
    {
        return response()->json([
            "status" => false,
            "invalid" => $invalids
        ], 400);
    }
}
