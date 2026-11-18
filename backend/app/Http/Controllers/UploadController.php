<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // Max 5MB
            ]);

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('images', 'public');
                $url = asset('storage/' . $path); // Menghasilkan URL lengkap
                
                return response()->json(['url' => $url], 200);
            }
            
            return response()->json(['error' => 'No file uploaded'], 400);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}