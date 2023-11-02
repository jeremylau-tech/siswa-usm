
const styles = {
    invoiceBox: {
        maxWidth: '800px',
        margin: 'auto',
        padding: '30px',
        border: '1px solid #eee',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
        fontSize: '16px',
        lineHeight: '24px',
        fontFamily: "'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif",
        color: '#555',
    },
    table: {
        width: '100%',
        lineHeight: 'inherit',
        textAlign: 'left',
    },
    tableTd: {
        padding: '5px',
        verticalAlign: 'top',
    },
    tableTdRight: {
        textAlign: 'right',
    },
    topTableTd: {
        paddingBottom: '20px',
    },
    title: {
        fontSize: '45px',
        lineHeight: '45px',
        color: '#333',
    },
    informationTableTd: {
        paddingBottom: '40px',
    },
    headingTd: {
        background: '#eee',
        borderBottom: '1px solid #ddd',
        fontWeight: 'bold',
    },
    detailsTd: {
        paddingBottom: '20px',
    },
    itemTd: {
        borderBottom: '1px solid #eee',
    },
    lastItemTd: {
        borderBottom: 'none',
    },
    totalTd: {
        borderBottomTop: '2px solid #eee',
        fontWeight: 'bold',
    },
    mediaQuery: {
        '@media only screen and (max-width: 600px)': {
            topTableTd: {
                width: '100%',
                display: 'block',
                textAlign: 'center',
            },
            informationTableTd: {
                width: '100%',
                display: 'block',
                textAlign: 'center',
            },
        },
    },
    rtl: {
        direction: 'rtl',
        fontFamily: "Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif",
    },
    rtlTable: {
        textAlign: 'right',
    },
    rtlTableTd: {
        textAlign: 'left',
    },
};