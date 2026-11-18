<?php
namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class GalleryController extends Controller
{
    public function index()
    {
        try {
            return response()->json(Gallery::orderBy('id', 'desc')->get(), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'image_url' => 'required|string|max:500', // Diubah dari url ke string
                'caption'   => 'nullable|string|max:255',
            ]);
            return response()->json(Gallery::create($data), 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $gallery = Gallery::findOrFail($id);
            $data = $request->validate([
                'image_url' => 'sometimes|required|string|max:500',
                'caption'   => 'nullable|string|max:255',
            ]);
            $gallery->update($data);
            return response()->json($gallery, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            Gallery::findOrFail($id)->delete();
            return response()->json(['message' => 'Deleted'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Not found'], 404);
        }
    }
}