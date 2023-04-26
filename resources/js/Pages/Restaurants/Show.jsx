import {useState} from "react";
import AppLayout from "@/Layouts/AppLayout";
import {Link, router, useForm} from "@inertiajs/react";
import Alert from "bootstrap/js/src/alert";

export default function Index({restaurant,auth,experiences,fil,dishy}){

    const {data,setData}=useForm({
        rating:'',
        restaurant_id:restaurant.id,
        dish_id:'',



    });


    const handleSubmit=(event)=>{




        if (data.rating !=null){
            event.preventDefault();
            router.post(route("experiences.store"),data);
        }

    }


    const restaurantsList=[];

    const handleDelete=(event)=>{
        router.delete(route("dishes.destroy",event.target.value));
    }

    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        })

    }


        const rating=(id)=>{
                let score=0;
                let sum=0;
            experiences.forEach((exp)=>{
                if (exp.dish_id==id){
                    score+=exp.rating;
                    sum++;
                }
            })

            let result=score/sum;

            return <td className="text-center">{result}</td>;
        }


    (dishy!=null?dishy:restaurant.dishes).forEach((dish)=>{



        restaurantsList.push(

            <tr key={dish.id}>

            <td>{dish.name}</td>
            <td>{dish.price}</td>
            <td>{dish.photo && <img alt="foto" width="80px" src={"/storage/dishes/"+dish.photo} />}</td>







            {auth.user != null && auth.user.type == 1?
                <td><Link className="btn btn-primary m-2" href={route('dishes.edit',dish.id)}>Redaguoti</Link >

                    <button className="btn btn-danger" onClick={handleDelete} value={dish.id}>Trinti</button > </td>
                :""

            }

            <td className="">
                <form onSubmit={handleSubmit}>
                    <select className={"form-select mt-4 mb-2"} id="rating" onChange={handleChange} >
                <option key="" value="">-</option>
                <option key="1" value="1">1</option>
                <option key="2" value="2">2</option>
                <option key="3" value="3">3</option>
                <option key="4" value="4">4</option>
                <option key="5" value="5">5</option>
            </select>

                <button className={"btn btn-warning float-end"} onClick={handleChange} id="dish_id" value={dish.id} >Ivertinti</button>
                </form>
            </td>
                {rating(dish.id)}





        </tr>)
    });



    const [order, setOrder]=useState({

        field:"price",
        dir:1
    });



    let dishes=restaurant.dishes

    dishes.sort(
        (a, b)=>{
            if(a[order.field]>b[order.field]){
                return 1* order.dir;
            }

            if(a[order.field]<b[order.field]){
                return -1*order.dir;
            }
            return 0
        }
    );
    const [filter,setFilter]=useState({
        name:fil.name,
        restaurant_id:restaurant.id

    });

    const filterChange=(event)=>{
        setFilter({
            ...filter,
            [event.target.id]:event.target.value
        })

    }

    const handleFilter=()=>{
      router.post(route("dishes.filter"),filter);
    }



    return (
        <AppLayout>


            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Restorano: {restaurant.name} menu
                    </div>
                    <div className="card-body">
                        {auth.user != null && auth.user.type == 1 ?
                            <Link className="btn btn-success float-end" href={route("dishes.create",restaurant.id)}>Pridėti nauja patiekala</Link>:""
                        }

                        <table className="table">
                            <thead>
                            <tr>
                                <th>
                                    <input type="text" id="name" className="form-control"  onChange={filterChange} value={filter.name}/>
                                </th>
                                <th><button className="btn btn-success" onClick={handleFilter}>Ieškoti</button></th>
                            </tr>
                            <tr>
                                <th>
                                   Pavadinimas



                                </th>
                                <th>
                                    <span onClick={ ()=>{setOrder({field:"price",dir:order.field=='price'&&order.dir==1?-1:1})}}>Kaina</span>
                                </th>

                                <th>Nuotrauka</th>
                                {auth.user != null && auth.user.type == 1?
                                    <th  className="">Veiksmai</th>:""}

                                <th>Ivetinkite</th>
                                <th>Patiekalo ivertinimas</th>

                            </tr>
                            </thead>
                            <tbody>
                            {restaurantsList}
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>




        </AppLayout>
    );
}
