import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import "datatables.net-responsive";
import "datatables.net-select";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import "datatables.net-select-dt/css/select.dataTables.min.css";
import useApi from "../../Hooks/response";

DataTable.use(DT);

const TuitionFees = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { data: tuitionFees, get: getTuitionFees } = useApi("tuition-fees");

    useEffect(() => {
        getTuitionFees();
    }, []);

    useEffect(() => {
        if (tuitionFees) {
            try {
                const tuitionDatas = tuitionFees.tuitionFees;
                const formattedTables = tuitionDatas.map((table) => {
                    const columns = table.columns
                        .map((col) => ({
                            title: col.name,
                            data: col.name.toLowerCase().replace(/\s+/g, "_"),
                            className: "text-nowrap",
                            order: col.order,
                        }))
                        .sort((a, b) => a.order - b.order);

                    return {
                        tableInfo: table.table,
                        columns,
                        data: table.rows.map((row) => {
                            const transformedRow = {};
                            table.columns.forEach((col) => {
                                const key = col.name
                                    .toLowerCase()
                                    .replace(/\s+/g, "_");
                                transformedRow[key] =
                                    row[
                                        Object.keys(row).find(
                                            (k) =>
                                                k
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "_") ===
                                                key
                                        )
                                    ];
                            });
                            return transformedRow;
                        }),
                    };
                });
                setTables(formattedTables);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }
    }, [tuitionFees]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                Error loading data: {error}
            </div>
        );
    }

    return (
        <>
            <div className="col-lg-12 about_col about_col_left">
                <div className="about_item">
                    <div className="about_item_text">
                        <p>
                            At Lia Stephanie, we understand that choosing an
                            education is a significant decision for every
                            family. Therefore, we are committed to providing
                            transparency and flexibility in our fee structure,
                            so you can plan your child's education carefully.
                            <br />
                            The listed fees reflect the quality of education,
                            adequate facilities, and a learning environment that
                            fosters the academic, emotional, and character
                            development of students.
                        </p>
                        <h3 className="text-center py-4">
                            <strong>
                                {tuitionFees.title}
                            </strong>
                        </h3>
                    </div>
                </div>
            </div>

            {tables.map((table) => (
                <div
                    key={table.tableInfo.id}
                    className="col-lg-6 about_col about_col_left mb-4"
                >
                    <div className="about_item card p-3 h-100">
                        <div className="card-header about_item_title text-center mt-0 mb-3">
                            <h4 className="text-primary">
                                {table.tableInfo.name}
                            </h4>
                        </div>
                        <div className="table-responsive">
                            <DataTable
                                columns={table.columns}
                                data={table.data}
                                className="table table-bordered table-striped display responsive"
                                responsive={true}
                                ordering
                                select={{
                                    style: "os",
                                    items: "row",
                                }}
                                options={{
                                    headerCallback: function (thead) {
                                        $(thead)
                                            .find("th")
                                            .addClass(
                                                "bg-primary text-center text-white"
                                            );
                                    },
                                }}
                                language={{
                                    loadingRecords:
                                        '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>',
                                    zeroRecords: "No matching records found",
                                    info: "Showing _START_ to _END_ of _TOTAL_ entries",
                                    infoEmpty: "Showing 0 to 0 of 0 entries",
                                    infoFiltered:
                                        "(filtered from _MAX_ total entries)",
                                }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default TuitionFees;
