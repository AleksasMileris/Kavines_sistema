import {useState} from "react";
import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";

export default function Index({ auth, restaurants,fil,ord}){

    const restaurantsList=[];


    const handleDelete=(event)=>{
        router.delete(route("restaurants.destroy",event.target.value));
    }
    restaurants.forEach((restaurant)=>{


        restaurantsList.push(<tr key={restaurant.id}>
            <td>{restaurant.name}</td>
            <td>{restaurant.city}</td>
            <td>{restaurant.adress}</td>
            <td>{restaurant.workingHours}</td>
            <td><Link className={"btn btn-info m-2"} href={route('restaurants.show',restaurant.id)}>Menu</Link></td>





            {auth.user != null && auth.user.type == 1?
                <td><Link className="btn btn-primary m-2" href={route('restaurants.edit',restaurant.id)}>Redaguoti</Link >

                <button className="btn btn-danger" onClick={handleDelete} value={restaurant.id}>Trinti</button > </td>
                :<td></td>

            }

        </tr>)
    });


    const [filter,setFilter]=useState({
        name:fil.name,


    });

    const handleChange=(event)=>{
        setFilter({
            ...filter,
            [event.target.id]:event.target.value
        })

    }
    const handleFilter=()=>{
        router.post(route("restaurants.filter"),filter);
    }



    const [order, setOrder]=useState({
        field:"name",
        dir:1
    });



    let category=restaurants

    category.sort(
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
    return (
        <AppLayout>


            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Restoranai
                    </div>
                    <div className="card-body">
                        {auth.user != null && auth.user.type == 1 ?
                            <Link className="btn btn-success float-end" href={route("restaurants.create")}>Pridėti nauja restoraną</Link>:""
                        }

                        <table className="table">
                            <thead>
                            <tr>
                                <th>
                                    <input type="text" id="name" className="form-control"  onChange={handleChange} value={filter.name}/>
                                </th>
                                <th><button className="btn btn-success" onClick={handleFilter}>Ieškoti</button></th>
                            </tr>
                            <tr>
                                <th>
                                    <Link href={route("restaurants.order",['name',ord.field=='name'&&ord.dir=="ASC"?"DESC":"ASC"])}>Pavadinimas</Link>


                                </th>
                                <th>
                                    <Link href={route("restaurants.order",['name',ord.field=='name'&&ord.dir=="ASC"?"DESC":"ASC"])}>Miestas</Link>

                                </th>

                                <th>Adresas</th>
                                <th>Darbo laikas</th>
                                <th>Patiekalai</th>
                                {auth.user != null && auth.user.type == 1?
                                <th colSpan="2" className="text-center">Veiksmai</th>:""}

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
