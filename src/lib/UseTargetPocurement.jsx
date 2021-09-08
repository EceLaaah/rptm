import { useState, useEffect, useContext } from "react";
import { TargetProcurementContext } from '../Context/TargetProcurementProvider'

export default function UseTargetPocurement() {
    const [getTarget, setTarget] = useState({
        date_created: "",
        targetNumber: 0
    });

    const { target } = useContext(TargetProcurementContext);

    const fetchTarget = () => {
        const dateToday = new Date();

        target.forEach((value) => {
            if (value.date_created === dateToday.toISOString().substring(0, 10)) {
                setTarget({ date_created: value.date_created, targetNumber: value.targetNumber })
            }
        })
    }

    useEffect(fetchTarget, []);

    return { getTarget };
}