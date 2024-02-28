<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use Log;

use App\Models\User;
use App\Models\Image;

class UserController extends Controller
{
    public function data ()
    {
        return response()->json(['response' => 'ok']);
    }

    public function login (Request $request)
    {
        Log::info('login funtion' . $request);
        $data = $request->json()->all();

        $user = User::where('name', $data['name'])
            ->where('password', $data['password'])
            ->first();

        Log::info($user);
        return response()->json([
            'response' => 'ok', 
            'user' => $user,
        ]);
    }

    public function image_upload(Request $request)
    {
        Log::info($request);
        $image = $request->file('image');
        Log::info($request->latitude);
        Log::info($request->longitude);
        Log::info($image->getRealPath());
        $path = null;
        if (filled($image)) {
            //画像のファイル名を生成
            $file_name = uniqid() . '.' . $image->getClientOriginalExtension();
            $path = 'images/' . $file_name;
            
            //画像をストレージに保存する
            Storage::put($path, $image->getRealPath());

            $images = new Image();

            $images->image_name = $file_name;
            $images->latitude = $request->latitude;
            $images->longitude = $request->longitude;
            $images->save();
            Log::info($images);
 
            Log::info('保存完了');
        } else {
            Log::info('保存失敗');
        }
        
        return response()->json([
            'path' => $path,
        ]);
    }
}
