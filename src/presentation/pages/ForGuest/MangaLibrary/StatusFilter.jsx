function StatusFilter({ statusFilter, setStatusFilter }) {
    const statuses = ["Tất cả", "Đang tiến hành", "Hoàn thành"];
    return (
        <div>
            <div className="mb-2">Trạng thái</div>
            <div className="flex gap-2 mb-6">
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-1 rounded border ${
                            statusFilter === status
                                ? "bg-green-500 text-white border-green-500"
                                : "bg-white text-gray-700 border-gray-300"
                        } hover:bg-green-400 hover:text-white transition`}
                    >
                        {status}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default StatusFilter;
