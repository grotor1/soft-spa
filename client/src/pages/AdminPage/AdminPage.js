import React, {useEffect, useState} from "react";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {Route, Switch} from "react-router-dom";
import './AdminPage.css'
import {TrainerAddMenu} from "./components/TrainerAddMenu/TrainerAddMenu";
import {TrainingTypesAddMenu} from "./components/TrainingTypesAddMenu/TrainingTypesAddMenu";
import {TrainersListMenu} from "./components/TrainersListMenu/TrainersListMenu";
import {TrainingTypesListMenu} from "./components/TrainingTypesListMenu/TrainingTypesListMenu";
import {TrainerEditMenu} from './components/TrainerEditMenu/TrainerEditMenu'
import {TrainingTypesEditMenu} from "./components/TrainingTypesEditMenu/TrainingTypesEditMenu";
import {useHttp} from "../../hooks/http.hook";

export const AdminPage = ({match}) => {
    const {path} = match
    const [userCount, setUserCount] = useState()
    const {request} = useHttp()
    useEffect(() => {
        const dataFromServer = async () => {
            try {
                const {count} = await request("/api/fetch/getUserCount", "GET")
                setUserCount(count)
            } catch (e) {
            }
        }
        dataFromServer()
    }, [])
    return (
        <div className="admin-page-wrapper">
            <Sidebar match={match}/>
            <Switch>
                <div className="right-section-wrapper">
                    <Route exact path={`${path}`}>
                        <h1>
                            Добро пожаловать в админку <br/>
                            Пользователей зарегистрировано: {userCount}
                        </h1>
                    </Route>
                    <Route path={`${path}/trainingAdd`}>
                        <TrainingTypesAddMenu/>
                    </Route>
                    <Route path={`${path}/trainerAdd`}>
                        <TrainerAddMenu/>
                    </Route>
                    <Route path={`${path}/trainerList`}>
                        <TrainersListMenu match={match}/>
                    </Route>
                    <Route path={`${path}/trainingTypeList`}>
                        <TrainingTypesListMenu match={match}/>
                    </Route>
                    <Route path={`${path}/trainerEdit/:_id_trainer`}>
                        <TrainerEditMenu/>
                    </Route>
                    <Route path={`${path}/trainingTypeEdit/:_id_trainingType`}>
                        <TrainingTypesEditMenu/>
                    </Route>
                </div>
            </Switch>
        </div>
    )
}
