import { useContext } from 'react';
import { Card } from '../../components'
import { TransactionContext } from '../../Context/TransactionProvider'
import { AuthContext } from '../../Context/auth'
import { filteredPendingTransaction } from '../../Utils/ReusableSyntax'

export default function NFACart() {

    const { finishTransaction } = useContext(TransactionContext);
    const context = useContext(AuthContext);

    const pendingTransactions = filteredPendingTransaction(finishTransaction, context);

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold mb-6">Pending Products</h1>
                <button className="bg-primary hover:bg-primary-slight text-white px-8 py-2 text-sm my-3 font-semibold rounded-sm">
                    Checkout
                </button>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex justify-center relative">
                {pendingTransactions.map((type) => (
                    <Card imageUrl={type.imageUrl} riceVariety={type.riceVariety} kilograms={type.socks} email={type.userEmail}>
                        <div className="text-center py-2 my-2 bg-primary opacity-80 font-bold text-white rounded-lg cursor-pointer">
                            {type.status}
                        </div>
                    </Card>
                ))}
            </section>
        </div>
    )
}