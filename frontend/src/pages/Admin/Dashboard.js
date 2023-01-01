import style from "./Admin.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ReportIcon from "@mui/icons-material/Report";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <>
    <div className="cards" style={{ display: "flex", marginTop: "60px" }}>
      <div style={{ marginLeft: "100px" }}>
        <Link
          className={style["link"]}
          to="/admin/addAdmin"
          style={{ textDecorationLine: "none", color: "black" }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia>
                <SupervisorAccountIcon
                  style={{
                    width: "50%",
                    marginLeft: "25%",
                    marginRight: "25%",
                    height: "10%",
                  }}
                />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <span style={{ display: "flex", justifyContent: "center" }}>
                    <b> Add Admin </b>
                  </span>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions></CardActions>
          </Card>
        </Link>
      </div>
      <div style={{marginLeft:"100px"}}>
      <Link
            className={style["link"]}
            to="/admin/addCorporate"
            style={{ textDecorationLine: "none", color: "black" }}
            >
 <Card sx={{ maxWidth: 345}}>
      <CardActionArea>
        <CardMedia>
         <CorporateFareIcon style={{width:"50%",marginLeft:"25%",marginRight:"25%",height:"10%"}} />

        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           <span style={{ display: "flex" , justifyContent: "center"}}> <b>Add Corporate Trainee </b></span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
        </Link> 
    </div>
    <div style={{marginLeft:"100px"}}>
      <Link
            className={style["link"]}
            to="/admin/addInstructor"
            style={{ textDecorationLine: "none", color: "black" }}
            >
 <Card sx={{ maxWidth: 345}}>
      <CardActionArea>
        <CardMedia>
         <PersonAddAltIcon style={{width:"50%",marginLeft:"25%",marginRight:"25%",height:"10%"}} />

        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           <span style={{ display: "flex" , justifyContent: "center"}}><b> Add Instructor</b> </span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
        </Link> 
    </div>
    </div>
    <div className="cards" style={{display: "flex" ,marginTop:"150px"}}>

    <div style={{marginLeft:"100px"}}>
      <Link
            className={style["link"]}
            to="/admin/viewReports"
            style={{ textDecorationLine: "none", color: "black" }}
            >
 <Card sx={{ maxWidth: 345}}>
      <CardActionArea>
        <CardMedia>
         <ReportIcon style={{width:"50%",marginLeft:"25%",marginRight:"25%",height:"10%"}} />

        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           <span style={{ display: "flex" , justifyContent: "center"}}><b> View Reports</b> </span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
        </Link> 
    </div>
    <div style={{marginLeft:"100px"}}>
      <Link
            className={style["link"]}
            to="/admin/viewRequests"
            style={{ textDecorationLine: "none", color: "black" }}
            >
 <Card sx={{ maxWidth: 345}}>
      <CardActionArea>
        <CardMedia>
         <FormatListBulletedIcon style={{width:"50%",marginLeft:"25%",marginRight:"25%",height:"10%"}} />

        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           <span style={{ display: "flex" , justifyContent: "center"}}><b> View Enroll Requests</b> </span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
        </Link> 
    </div>
    <div style={{marginLeft:"100px"}}>
      <Link
            className={style["link"]}
            to="/admin/RefundRequests"
            style={{ textDecorationLine: "none", color: "black" }}
            >
 <Card sx={{ maxWidth: 345}}>
      <CardActionArea>
        <CardMedia>
         <FormatListBulletedIcon style={{width:"50%",marginLeft:"25%",marginRight:"25%",height:"10%"}} />

        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           <span style={{ display: "flex" , justifyContent: "center"}}><b> View Refund Requests</b> </span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
        </Link> 
    </div>
      </div>
      <div style={{display: "flex" ,marginLeft:"100px" ,marginTop:"150px",marginBottom:"50px"}}>
      <Link
            className={style["link"]}
            to="/admin/ setPromotion"
            style={{ textDecorationLine: "none", color: "black" }}
            >
 <Card sx={{ maxWidth: 345}}>
      <CardActionArea>
        <CardMedia>
         <FormatListBulletedIcon style={{width:"50%",marginLeft:"25%",marginRight:"25%",height:"10%"}} />

        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           <span style={{ display: "flex" , justifyContent: "center"}}><b> Add Promotions</b> </span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
        </Link> 
      </div>
    </>
  );
};

export default Dashboard;
