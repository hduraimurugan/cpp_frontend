import Footer from "../shared/Footer"
import Navbar from "../shared/Navbar"
import { AdminAnalyticTable } from "./AdminAnalyticTable.jsx"


const AdminHome = () => {

    return (
        <div>
             <Navbar/> 
             <AdminAnalyticTable/>
             <Footer/>
        </div>
    )
}

export default AdminHome