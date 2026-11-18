<?php
namespace App\Http\Controllers;

use App\Models\Music;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MusicController extends Controller
{
    public function index()
    {
        try {
            return response()->json(Music::orderBy('id', 'desc')->get(), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'title'     => 'required|string|max:255',
                'type'      => 'required|string|max:50',
                'embed_url' => 'required|string|max:500',
            ]);
            return response()->json(Music::create($data), 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $music = Music::findOrFail($id);
            $data = $request->validate([
                'title'     => 'sometimes|required|string|max:255',
                'type'      => 'sometimes|required|string|max:50',
                'embed_url' => 'sometimes|required|string|max:500',
            ]);
            $music->update($data);
            return response()->json($music, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            Music::findOrFail($id)->delete();
            return response()->json(['message' => 'Deleted'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Not found'], 404);
        }
    }
}