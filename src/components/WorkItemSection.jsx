import WorkItemFilter from "./WorkItemFilters"
import WorkItemTable from "./WorkItemTable"

function WorkItemSection() {
    return (
        <section>
            <h2>Work Items</h2>
            <WorkItemFilter />
            <WorkItemTable />

            <div className="work-section-footer">
                <p>Showing 1 to 4 of 4 items</p>

                <div className="pagination">
                    <button type="button">‹</button>
                    <button type="button" className="active-page">
                        1
                    </button>
                    <button type="button">›</button>
                </div>
            </div>


        </section>
    )
}

export default WorkItemSection