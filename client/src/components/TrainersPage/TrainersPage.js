import React, {useEffect} from 'react'
import Header from '../Header/Header'
import './TrainersPage.css'
import Trainer from './Trainer'
import Footer from '../Footer'
import {useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import TrainerPage from "./TrainerPage";
import {DotLoader} from "react-spinners";


const TrainersPage = () => {
    const {url, path} = useRouteMatch()
    const {request, error, clearError} = useHttp()
    const message = useMessage()
    const [trainers, setTrainers] = useState([])
    const [trainingTypes, setTrainingTypes] = useState([])

    useEffect(() => {
        const dataFromServer = async () => {
            try {
                const {data} = await request(`/api/fetch/getTrainersList`, 'GET')
                setTrainers(data)
            } catch (e) {
            }
        }
        dataFromServer();
    }, [request])

    useEffect(() => {
        const dataFromServer = async () => {
            try {
                const {data} = await request(`/api/fetch/getTrainingTypeList`, 'GET')
                setTrainingTypes(data)
            } catch (e) {
            }
        }
        dataFromServer();
    }, [request])


    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    // const [buttonPopup, setButtonPopup] = useState(false)
    return (
        <div>
            <Header/>
            <div className="trainers">
                <div className="container">
                    <h1 className="trainers__title">Тренеры</h1>
                    <div className="trainers__description">
                        <p className="trainers__text">Выберите тренера из предложеных или <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSewKiUK4hdB3tA7GwreTRDctwxo4Xp_zzr1YDHOH6bguKEYLw/viewform?usp=sf_link" className="green-text">оставьте заявку</a></p>
                        {/* <button className="btn__apply" onClick={() => setButtonPopup(true)}>Подать заявку</button> */}
                    </div>

                    <ul className="trainers__list">
                        <DotLoader loading={!trainers.length} css="margin-top: 20vh;"/>
                        {trainers.map(trainer => {
                            return (
                                <Trainer isPropped={true}
                                         bigAvatar={trainer.bigAvatar}
                                         name={trainer.name + " " + trainer.surname}
                                         info={trainer.trainingTypes.map((trainerTrainingType, index) => {
                                             const trainingType = trainingTypes.find(trainingType => {
                                                 return trainingType._id === trainerTrainingType._id_training
                                             })
                                             if (trainingType) {
                                                 if (index + 1 !== trainer.trainingTypes.length) {
                                                     return (trainingType.name + ", ")
                                                 } else {
                                                     return (trainingType.name)
                                                 }
                                             }
                                         }).join("") + "."}
                                         url={url}
                                         _id={trainer._id}
                                />
                            );
                        })}
                    </ul>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default TrainersPage