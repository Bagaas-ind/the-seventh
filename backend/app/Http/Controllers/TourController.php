<?php
namespace App\Http\Controllers;

use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TourController extends Controller
{
    public function index()
    {
        try {
            $tours = Tour::where('is_active', true)->orderBy('date', 'asc')->get();
            return response()->json($tours, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed', 'error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'date'        => 'required|date',
                'city'        => 'required|string|max:100',
                'venue'       => 'required|string|max:150',
                'ticket_link' => 'nullable|string|max:500', // Diubah dari url ke string
                'is_active'   => 'boolean',
            ]);
            return response()->json(Tour::create($data), 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $tour = Tour::findOrFail($id);
            $data = $request->validate([
                'date'        => 'sometimes|required|date',
                'city'        => 'sometimes|required|string|max:100',
                'venue'       => 'sometimes|required|string|max:150',
                'ticket_link' => 'nullable|string|max:500',
                'is_active'   => 'boolean',
            ]);
            $tour->update($data);
            return response()->json($tour, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            Tour::findOrFail($id)->delete();
            return response()->json(['message' => 'Deleted'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Not found'], 404);
        }
    }
}