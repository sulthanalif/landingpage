<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadImagePostController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate(['file' => 'required|image|max:2048']);

        $path = $request->file('file')->store('uploads', 'public');

        return response()->json(['location' => asset("storage/$path")]);
    }
}
