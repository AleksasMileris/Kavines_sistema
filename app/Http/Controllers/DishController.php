<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class DishController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {


        return inertia("Dishes/Create",[
            'restaurant_id'=>$id,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'name'=>'required|min:3',
                'price'=>'required|min:3',

            ]);
        $dish= new Dish();
        $dish->name=$request->name;
        $dish->restaurant_id=$request->restaurant_id;
        $dish->price=$request->price;

        if ($request->file("photo")!=null){
            $request->file("photo")->store("/public/dishes");
            $dish->photo=$request->file("photo")->hashName();
        }

        $dish->save();

        return to_route('restaurants.show',$request->restaurant_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Dish $dish)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dish $dish)
    {
        return inertia("Dishes/Edit",[
                'dish'=>$dish,

            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dish $dish)
    {
        $dish->name=$request->name;
        $dish->restaurant_id=$request->restaurant_id;
        $dish->price=$request->price;
        if ($request->file("photo")!=null){
            if ($dish->photo!=null){
                unlink(storage_path()."/app/public/dishes/".$dish->photo);
            }
            $request->file("photo")->store("/public/dishes");
            $dish->photo=$request->file("photo")->hashName();
        }
        $dish->save();

        return to_route('restaurants.show',$request->restaurant_id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dish $dish)
    {
        $dish->delete();
       return redirect()->back();
    }




}
