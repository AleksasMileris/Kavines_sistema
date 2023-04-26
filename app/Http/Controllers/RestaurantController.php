<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $emFilter=new \stdClass();
        $emFilter->name="";

        $filter=$request->session()->get("restaurant_filter",$emFilter);

        $emOrder=new \stdClass();
        $emOrder->field="";
        $emOrder->dir="";

        $order=$request->session()->get("restaurant_order",$emOrder);

        return Inertia::render('Restaurants/index', [
           'restaurants'=>Restaurant::filter($filter)->order($order)->with('dishes')->get(),
            'fil'=>$filter,
            'ord'=>$order
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Restaurants/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'name'=>'required|min:3',
                'city'=>'required|min:3',
                'adress'=>'required|min:3',
                'workingHours'=>'required|min:3',
            ],

        );
        $restaurant= new Restaurant();
        $restaurant->create($request->all());

        return to_route('restaurants.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant,Request $request)
    {

        $emFilter=new \stdClass();
        $emFilter->name="";

        $filter=$request->session()->get("dishes_filter",$emFilter);

        return Inertia::render('Restaurants/Show', [

            'restaurant'=>Restaurant::with('dishes')->where("id","like",$restaurant->id)->first(),
            'dishy'=>$filter->name!=""?$restaurant->dishes()->where('name', 'like', "%$filter->name%")->get():null,
            'experiences'=>Experience::all()->where('restaurant_id','like',$restaurant->id),
            'fil'=>$filter
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Restaurant $restaurant)
    {
        return inertia("Restaurants/Edit",[
                'restaurant'=>$restaurant,

            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Restaurant $restaurant)
    {
        $restaurant->fill($request->all());
        $restaurant->save();
        return to_route('restaurants.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant)
    {
        $restaurant->delete();
        return to_route("restaurants.index");
    }

    public function filter(Request $request){
        $filter=new \stdClass();
        $filter->name=$request->name;
        $request->session()->put("restaurant_filter",$filter);
        to_route('restaurants.index');
    }

public function filterDishes(Request $request){
    $filter=new \stdClass();
    $filter->name=$request->name;
    $request->session()->put("dishes_filter",$filter);
    to_route('restaurants.show',$request->restaurant_id);
}

    public function order($field,$dir,Request $request){
        $order=new \stdClass();
        $order->field=$field;
        $order->dir=$dir;
        $request->session()->put("restaurant_order",$order);

        to_route('restaurants.index');
    }
}
