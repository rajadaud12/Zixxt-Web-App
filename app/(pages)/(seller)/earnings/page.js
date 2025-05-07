"use client"
import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Download, FileText, DollarSign, Tag, CreditCard } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from 'jspdf-autotable'
import { Dropdown } from "@/components/utils/dropdown"

export default function EarningsPage() {
    const [timeRange, setTimeRange] = useState("Yearly")
    const [historyRange, setHistoryRange] = useState("Last 7 days")
    const [paymentMethods, setPaymentMethods] = useState({
        stripe: { active: true, id: "" },
        wise: { active: false, id: "" },
        paypal: { active: false, email: "" }
    })
    const [showPopup, setShowPopup] = useState(null)
    const [inputValue, setInputValue] = useState("")

    // Chart data based on time range
    const getChartData = () => {
        if (timeRange === "Daily") {
            return [
                { day: "Mon", value: 10000 },
                { day: "Tue", value: 15000 },
                { day: "Wed", value: 20000 },
                { day: "Thu", value: 74364.77 },
                { day: "Fri", value: 25000 },
                { day: "Sat", value: 30000 },
                { day: "Sun", value: 20000 },
            ]
        }
        return [
            { month: "Jan", value: 10000 },
            { month: "Feb", value: 25000 },
            { month: "Mar", value: 35000 },
            { month: "Apr", value: 74364.77 },
            { month: "May", value: 35000 },
            { month: "Jun", value: 40000 },
            { month: "Jul", value: 20000 },
            { month: "Aug", value: 35000 },
            { month: "Sep", value: 60000 },
            { month: "Oct", value: 45000 },
            { month: "Nov", value: 50000 },
            { month: "Dec", value: 45000 },
        ]
    }

    // Sample payment history data
    const paymentHistory = [
        { activity: "Refund", orderId: "#232322", buyer: "-", orderType: "service", date: "2/1/2025", amountPaid: "-$50", paymentMethod: "Wise" },
        { activity: "Posting sale", orderId: "#232321", buyer: "daude88", orderType: "service", date: "2/2/2025", amountPaid: "$100", paymentMethod: "Wise" },
        { activity: "Withdraw", orderId: "#W23245", buyer: "-", orderType: "—", date: "1/28/2025", amountPaid: "-$500", paymentMethod: "Stripe" },
        { activity: "Posting sale", orderId: "#232350", buyer: "johndoe", orderType: "educational content", date: "1/25/2025", amountPaid: "$129", paymentMethod: "Paypal" },
        { activity: "—", orderId: "—", buyer: "—", orderType: "—", date: "1/23/2025", amountPaid: "—", paymentMethod: "—" },
    ]

    // Custom tooltip for the chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-black text-white px-3 py-2 rounded-md">
                    <p className="font-medium">{label}</p>
                    <p className="text-sm">${payload[0].value.toLocaleString()}</p>
                </div>
            )
        }
        return null
    }

    // Handle dropdown change
    const handleTimeRangeChange = (option) => {
        setTimeRange(option)
    }

    const handleHistoryRangeChange = (option) => {
        setHistoryRange(option)
    }

    // Handle payment method toggle
    const handlePaymentMethodChange = (method) => {
        if (!paymentMethods[method].active) {
            const updatedMethods = Object.keys(paymentMethods).reduce((acc, key) => {
                acc[key] = { ...paymentMethods[key], active: key === method }
                return acc
            }, {})
            setPaymentMethods(updatedMethods)
        }
    }

    // Handle popup open/close and submission
    const handleAddClick = (method) => {
        setShowPopup(method)
        setInputValue(method === "paypal" ? paymentMethods[method].email : paymentMethods[method].id)
    }

    const handlePopupSubmit = () => {
        if (showPopup) {
            setPaymentMethods(prev => ({
                ...prev,
                [showPopup]: {
                    ...prev[showPopup],
                    ...(showPopup === "paypal" ? { email: inputValue } : { id: inputValue })
                }
            }))
            setShowPopup(null)
            setInputValue("")
        }
    }

    // Generate PDF using jsPDF and autoTable
    const generatePDF = () => {
        const doc = new jsPDF();

        // Set document title
        doc.setFontSize(16);
        doc.text("Payment History", 14, 20);

        // Prepare table data
        const tableData = paymentHistory.map(item => [
            item.activity,
            item.orderId,
            item.buyer,
            item.orderType,
            item.date,
            item.amountPaid,
            item.paymentMethod
        ]);

        // Use autoTable to create the table
        autoTable(doc, {
            startY: 30,
            head: [['Activity', 'Order ID', 'Buyer', 'Order Type', 'Date', 'Amount Paid', 'P. Method']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [1, 140, 255] },
            styles: { fontSize: 10, cellPadding: 3 },
        });

        // Save the PDF
        doc.save('payment_history.pdf');
    }

    // Get order type badge style
    const getOrderTypeBadge = (orderType) => {
        switch (orderType) {
            case "service": return "bg-secondary text-primary"
            case "educational content": return "bg-green-100 text-course"
            default: return "bg-gray-100 text-textLight border border-dashed"
        }
    }

    // Get amount color
    const getAmountColor = (activity) => {
        if (activity === "Refund" || activity === "Withdraw") {
            return "text-failure"
        }
        return "text-success"
    }

    return (
        <div className="max-w-[1240px] w-full mx-auto py-8 px-6 pt-24">
            {/* Header */}
            
            <div className="text-center mb-10">
          <h1 className="typoH1 text-black mb-2">Earnings And Payments</h1>
          <p className="typoB1 text-textLight">Everything related to your payments and earnings is handled here</p>
        </div>

            {/* Top Cards and Payment Methods Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                    {/* Top Cards Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {/* Available Balance */}
                        <div className="bg-white rounded-[20px] border border-border p-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="typoC2 text-textLight">Available Balance</p>
                                    <h3 className="typoH2">$ 12000</h3>
                                </div>
                            </div>
                        </div>
                        {/* Requested for withdrawal */}
                        <div className="bg-white rounded-[20px] border border-border p-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                    <Tag className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="typoC2 text-textLight">Requested for withdrawal</p>
                                    <h3 className="typoH2">$ 12000</h3>
                                </div>
                            </div>
                        </div>
                        {/* Total Earnings */}
                        <div className="bg-white rounded-[20px] border border-border p-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="typoC2 text-textLight">Total Earnings</p>
                                    <h3 className="typoH2">$ 12000</h3>
                                </div>
                            </div>
                        </div>
                        {/* Balance Paid */}
                        <div className="bg-white rounded-[20px] border border-border p-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                    <CreditCard className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="typoC2 text-textLight">Balance Paid</p>
                                    <h3 className="typoH2">$ 12000</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Withdraw Button */}
                    <div className="mb-6">
                        <button className="w-full rounded-[20px] text-primary bg-whiteGrey hover:bg-secondary px-6 py-3 h-[50px] font-semibold">
                            Withdraw Amount
                        </button>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-[20px] border border-border p-6 relative">
                    <h3 className="typoS2 mb-6">Payment Methods</h3>
                    <div className="space-y-4">
                        {/* Stripe */}
                        <div className="flex items-center justify-between bg-[#F8F7FF] rounded-full p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <span className="text-xl font-bold">S</span>
                                </div>
                                <span className="typoB3">Stripe</span>
                            </div>
                            <div className="flex items-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={paymentMethods.stripe.active}
                                        onChange={() => handlePaymentMethodChange('stripe')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                                <button
                                    onClick={() => handleAddClick('stripe')}
                                    className="ml-4 px-4 py-2 bg-white text-text rounded-full text-sm hover:bg-gray-100"
                                >
                                    {paymentMethods.stripe.id ? "Edit Stripe" : "Add Stripe"}
                                </button>
                            </div>
                        </div>
                        {/* Wise */}
                        <div className="flex items-center justify-between bg-[#F1FFF6] rounded-full p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <span className="text-xl font-bold">W</span>
                                </div>
                                <span className="typoB3">Wise</span>
                            </div>
                            <div className="flex items-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={paymentMethods.wise.active}
                                        onChange={() => handlePaymentMethodChange('wise')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                                <button
                                    onClick={() => handleAddClick('wise')}
                                    className="ml-4 px-4 py-2 bg-white text-text rounded-full text-sm hover:bg-gray-100"
                                >
                                    {paymentMethods.wise.id ? "Edit Wise" : "Add Wise"}
                                </button>
                            </div>
                        </div>
                        {/* Paypal */}
                        <div className="flex items-center justify-between bg-[#F0F9FF] rounded-full p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <span className="text-xl font-bold">P</span>
                                </div>
                                <span className="typoB3">Paypal</span>
                            </div>
                            <div className="flex items-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={paymentMethods.paypal.active}
                                        onChange={() => handlePaymentMethodChange('paypal')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                                <button
                                    onClick={() => handleAddClick('paypal')}
                                    className="ml-4 px-4 py-2 bg-white text-text rounded-full text-sm hover:bg-gray-100"
                                >
                                    {paymentMethods.paypal.email ? "Edit Paypal" : "Add Paypal"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Popup for adding/editing payment details */}
                    {showPopup && (
                        <div className="absolute inset-0 bg-white rounded-[20px] p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="typoS2">{showPopup.toUpperCase()} {showPopup === "paypal" ? "EMAIL" : "ID"}</h3>
                                    <button onClick={() => setShowPopup(null)} className="text-textLight">✕</button>
                                </div>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={`Enter Your ${showPopup === "paypal" ? "Paypal Email" : `${showPopup} ID`}`}
                                    className="w-full p-3 border border-border rounded-[10px] focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowPopup(null)}
                                    className="px-6 py-2 border border-border rounded-full text-text hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePopupSubmit}
                                    className="px-6 py-2 bg-primary text-white rounded-full hover:bg-blue-600"
                                >
                                    Add {showPopup}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sales Chart */}
            <div className="bg-white rounded-[20px] border border-border p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="typoS2">Sales Chart</h3>
                    <Dropdown
                        options={["Yearly", "Daily"]}
                        defaultValue="Yearly"
                        onChange={handleTimeRangeChange}
                        variant="default"
                        className="max-w-[150px]"
                    />
                </div>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={getChartData()}
                            margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#018CFF" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#018CFF" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                            <XAxis
                                dataKey={timeRange === "Daily" ? "day" : "month"}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#767B7F", fontSize: 12 }}
                                padding={{ left: 20, right: 20 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#767B7F", fontSize: 12 }}
                                domain={[0, "dataMax + 10000"]}
                                tickFormatter={(value) => `${value / 1000}k`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#018CFF"
                                strokeWidth={2}
                                fill="url(#colorGradient)"
                                dot={{ r: 4, fill: "#018CFF" }}
                                activeDot={{ r: 6, fill: "#018CFF" }}
                            />
                            {getChartData().map((entry, index) => {
                                if (entry.value === 74364.77) {
                                    return (
                                        <g key={`flag-${index}`}>
                                            <text
                                                x={index * (100 / getChartData().length) + 30}
                                                y={80}
                                                fill="#018CFF"
                                                fontSize={12}
                                                textAnchor="middle"
                                            >
                                                74,364.77
                                            </text>
                                        </g>
                                    )
                                }
                                return null
                            })}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-[20px] border border-border p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h3 className="typoS2">Payment History</h3>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <Dropdown
                            options={["Last 7 days", "Last 30 days", "Last 3 months", "Last year"]}
                            defaultValue="Last 7 days"
                            onChange={handleHistoryRangeChange}
                            variant="default"
                            className="w-[150px]"
                        />
                        <button onClick={generatePDF} className="btnPrimary btnMedium rounded-[500px] flex items-center justify-center space-x-2 px-6 py-3 bg-primary min-w-[200px]">
                            <Download className="w-4 h-4" />
                            <span>Generate PDF</span>
                        </button>

                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="typoB4 text-textLight text-left px-4 py-5">Activity</th>
                                <th className="typoB4 text-textLight text-left px-4 py-5">Order ID</th>
                                <th className="typoB4 text-textLight text-left px-4 py-5">Buyer</th>
                                <th className="typoB4 text-textLight text-left px-4 py-5">Order Type</th>
                                <th className="typoB4 text-textLight text-left px-4 py-5">Date</th>
                                <th className="typoB4 text-textLight text-left px-4 py-5">Amount Paid</th>
                                <th className="typoB4 text-textLight text-left px-4 py-5">P. Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory.map((item, index) => (
                                <tr key={index} className="border-b border-border">
                                    <td className="typoB3 text-text px-4 py-5">{item.activity === "—" ? "—" : item.activity}</td>
                                    <td className="typoB3 text-textLight px-4 py-5">{item.orderId === "—" ? "—" : item.orderId}</td>
                                    <td className="typoB3 text-textLight px-4 py-5">{item.buyer === "—" ? "—" : item.buyer}</td>
                                    <td className="typoB3 px-4 py-5">
                                        <span className={`px-2 py-1 rounded-full text-xs ${getOrderTypeBadge(item.orderType)}`}>
                                            {item.orderType === "—" ? "—" : item.orderType}
                                        </span>
                                    </td>
                                    <td className="typoB3 text-textLight px-4 py-5">{item.date === "—" ? "—" : item.date}</td>
                                    <td className={`typoB3 px-4 py-5 ${getAmountColor(item.activity)}`}>{item.amountPaid === "—" ? "—" : item.amountPaid}</td>
                                    <td className="typoB3 text-textLight px-4 py-5">{item.paymentMethod === "—" ? "—" : item.paymentMethod}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}