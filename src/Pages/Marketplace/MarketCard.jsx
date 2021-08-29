import { Popconfirm } from 'antd';
import { Card } from '../../components'
import RolesHooks from '../../lib/RolesHook'

export default function MarkerCard(props) {


    const { info } = RolesHooks();

    return (
        <Card
            cardStyle="truncate"
            key={props.index}
            image={props.imageUrl}
            kilograms={props.kilograms}
            price={props.price}
            title={props.riceVariety}
            name={props.email}
            description={props.description}
        >
            <div className="text-right">
                {info.role === "NFA" ? (
                    <Popconfirm
                        title="Would you like to purchase this item?"
                    >
                        <button className="bg-primary hover:bg-primary-slight text-white px-8 py-1 text-sm my-3 font-semibold rounded-sm">
                            Buy
                        </button>
                    </Popconfirm>
                ) : (
                    <Popconfirm
                        title="Are you sure you want to bid?"
                        onConfirm={(event) => props.isToggle(event, props.id)}
                    >
                        <button className="bg-primary hover:bg-primary-slight text-white px-8 py-1 text-sm my-3 font-semibold rounded-sm">
                            Bid
                        </button>
                    </Popconfirm>
                )}
            </div>
        </Card>
    )
}