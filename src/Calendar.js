function Calendar({date}){

    const dayStartMonth = date.clone().startOf('Month').format('dddd');

    const countOfDays = date.daysInMonth();

    let numberDayStart = 0;

    const dayWeek = ['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье'];

    let countDayInFirstWeek = 0;

    for (let i = 0; i < dayWeek.length; i++){
        if (dayStartMonth === dayWeek[i]){
            numberDayStart = i + 1;
            countDayInFirstWeek = 7 - i;
        }
    }

    let countWeeksInMonth = Math.ceil((countOfDays-countDayInFirstWeek)/7);

    const getStartWeek = () => {
        let content = [];
        for (let i = 1; i <= 7; i++){
            if (numberDayStart > i){
                content.push(<td className="ui-datepicker-other-month">{date.clone().subtract(date.date()+(numberDayStart - i - 1),'days').format('D')}</td>);
            }
            else if (numberDayStart === i){
                if (date.date() === 1){
                    content.push(<td className="ui-datepicker-today">{date.clone().subtract(date.date() - 1,'days').format('D')}</td>);
                }
                else {
                    content.push(<td>{date.clone().subtract(date.date() - 1,'days').format('D')}</td>);
                }
            }
            else {
                if (i + 1 - numberDayStart === date.date()){
                    content.push(<td className="ui-datepicker-today">{date.clone().subtract(date.date() - (i + 1 - numberDayStart),'days').format('D')}</td>);
                }
                else {
                    content.push(<td>{date.clone().subtract(date.date() - (i + 1 - numberDayStart),'days').format('D')}</td>);
                }
            }
        }
        return content;
    }

    const monthWeek = () =>{
        let content = [];
        for (let i = 1; i <= countWeeksInMonth; i++){
            content.push(<tr>{daysForWeek(i)}</tr>);
        }
        return content;
    }

    const daysForWeek = (week) => {
        let content = [];
        for (let j = 1; j <= 7; j++){
            if (countDayInFirstWeek + j + 7 * (week - 1) === date.date()){
                content.push(<td className="ui-datepicker-today">{date.date()}</td>);
            }
            else if (countDayInFirstWeek + j + 7 * (week - 1) > countOfDays) {
                content.push(<td className="ui-datepicker-other-month">{date.clone().add((countDayInFirstWeek + j + 7 * (week - 1))-date.date(),'days').format('D')}</td>);
            }
            else {
                content.push(<td>{countDayInFirstWeek + j + 7 * (week - 1)}</td>);
            }
        }
        return content;
    }

    return(
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{date.format('dddd')}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{date.date()}</div>
                    <div className="ui-datepicker-material-month">{date.format('MMMM')}</div>
                    <div className="ui-datepicker-material-year">{date.format('YYYY')}</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{date.format('MMMM')}</span>&nbsp;<span className="ui-datepicker-year">{date.format('YYYY')}</span>
                </div>
            </div>
        <table className="ui-datepicker-calendar">
            <colgroup>
                <col/>
                <col/>
                <col/>
                <col/>
                <col/>
                <col className="ui-datepicker-week-end"/>
                <col className="ui-datepicker-week-end"/>
            </colgroup>
            <thead>
                <tr>
                    <th scope="col" title="Понедельник">Пн</th>
                    <th scope="col" title="Вторник">Вт</th>
                    <th scope="col" title="Среда">Ср</th>
                    <th scope="col" title="Четверг">Чт</th>
                    <th scope="col" title="Пятница">Пт</th>
                    <th scope="col" title="Суббота">Сб</th>
                    <th scope="col" title="Воскресенье">Вс</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {getStartWeek()}
                </tr>
                {monthWeek()}
            </tbody>
        </table>
        </div>
    );
}

export default Calendar;