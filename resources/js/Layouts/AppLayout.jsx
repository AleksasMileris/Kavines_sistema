import 'bootstrap/dist/css/bootstrap.css';
import {Link, usePage} from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";

export default function AppLayout({children}){
    const {auth}=usePage().props
    const user=auth.user
    return(
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Cafe.lt</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">


                                    <Link className="nav-link active" href={route("restaurants.index")} >Kavines</Link>
                                </li>





                            </ul>
                        </div>
                        {user==null ?
                            <div className="float-end">


                                <Link className="btn btn-primary m-2" href={route('login')}>Prisijungti</Link>



                                <Link className="btn btn-secondary m-2" href={route('register')}>Registruotis</Link>


                            </div>
                            :
                            <div className="float-end">

                                <span className="m-3">Esate prijunges kaip:({user.type==1?"administratorius":"vartotojas"}) <b>{user.name}</b></span>
                                <Link className="btn btn-danger" href={route('logout')} method="post" as="button" >
                                    Atsijungti
                                </Link>


                            </div>
                        }
                    </div>
                </nav>

                {children}


            </div>

        </div>
    )

}
