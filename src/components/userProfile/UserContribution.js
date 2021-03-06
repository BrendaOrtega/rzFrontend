import React from 'react';
import './UserContribution.css';

import moment from 'moment';
//MaterialUI
import {Paper} from 'material-ui';

const img = "https://cdn3.iconfinder.com/data/icons/photography/512/Icon_3-512.png";

// const Loader = () => (
//     <RefreshIndicator
//         size={50}
//         left={70}
//         top={0}
//         loadingColor="#FF9800"
//         status="loading"
//         //style={style.refresh}
//     />
// );



const UserContribution = ({donaciones, fetched}) => {
    return(
        <div style={styles.aport}>

            {donaciones.map((d, key)=>{
                return(
                    <Paper key={key} className="flex_aport"  zDepth={1} rounded={false}>

                        <div className="aportacion">
                            <img src={d.proyecto.photo} alt=""/>

                        </div>

                        <div className="infor">
                            <h2>{d.recompensa.title}</h2>

                            <p>Finaliza el: {moment(d.proyecto.finish).format('LLL')}</p>
                        </div>
                        <div className="infor bordeado">
                            <h2>Aportacion: ${d.recompensa.amount}</h2>
                            <p>{d.recompensa.description}</p>
                        </div>

                    </Paper>
                )
            })}
        </div>
    );
};

const styles = {
    aport: {
        width: "90%",
        marginLeft: "5%",
        marginTop:"30px",

    }
};

export default UserContribution;