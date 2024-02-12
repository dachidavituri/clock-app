import './Information.css'
interface InfoProps {
    moreOpen: boolean
    latestData: {
        week_number: number;
        day_of_week: number;
        day_of_year: number;
        timezone: string;
    } | null
}
function Information({moreOpen, latestData}: InfoProps){
    return (
        <>
        {moreOpen && (
            <div className="grey">
              <div className=''>
                <div className="section">
                  <p>current timezone</p>
                  <h2>{latestData?.timezone}</h2>
                </div>
                <div className="section second">
                  <p>day of the year</p>
                  <h2>{latestData?.day_of_year}</h2>
                </div>
              </div>
              <div className='line'></div>
              <div>
                <div className="section">
                  <p>day of the week</p>
                  <h2>{latestData?.day_of_week}</h2>
                </div>
                <div className="section fourth">
                  <p>week number</p>
                  <h2>{latestData?.week_number}</h2>
                </div>
              </div>
            </div>
          )}
          </>
    )

}
export default Information