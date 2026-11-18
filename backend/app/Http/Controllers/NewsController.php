<?php
namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class NewsController extends Controller
{
    public function index()
    {
        try {
            $news = News::orderBy('created_at', 'desc')->get();
            return response()->json($news, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch news', 'error' => $e->getMessage()], 500);
        }
    }

    public function show(string $slug)
    {
        try {
            $news = News::where('slug', $slug)->firstOrFail();
            return response()->json($news, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'News not found'], 404);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title'     => 'required|string|max:255',
                'excerpt'   => 'nullable|string|max:500',
                'content'   => 'required|string',
                'image_url' => 'nullable|url|max:500',
            ]);

            $validated['slug'] = Str::slug($validated['title']) . '-' . uniqid();
            $news = News::create($validated);

            return response()->json($news, 201);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create', 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $news = News::findOrFail($id);
            $validated = $request->validate([
                'title'     => 'sometimes|required|string|max:255',
                'excerpt'   => 'nullable|string|max:500',
                'content'   => 'sometimes|required|string',
                'image_url' => 'nullable|url|max:500',
            ]);

            if (isset($validated['title']) && $validated['title'] !== $news->title) {
                $validated['slug'] = Str::slug($validated['title']) . '-' . uniqid();
            }

            $news->update($validated);
            return response()->json($news, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'News not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $news = News::findOrFail($id);
            $news->delete();
            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'News not found'], 404);
        }
    }
}