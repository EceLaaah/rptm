import { useContext } from "react";
import { Card } from "../../components";
import { ProductContext } from "../../Context/ProductProvider";
import { AuthContext } from "../../Context/auth";
import { pendingItems } from "../../Utils/ReusableSyntax";

export default function Cart() {
  const { fetchTransactionData } = useContext(ProductContext);
  const context = useContext(AuthContext);
  const pendingProduct = pendingItems(fetchTransactionData, context.uid);
  const ownPendingItems = pendingProduct.filter((obj) => {
    return obj.uid === context.uid;
  });

  return (
    <div className="max-w-content mx-auto px-4 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex justify-center relative">
        {ownPendingItems.map((items, index) => (
          <Card
            cardStyle="truncate"
            key={index}
            image={items.imageUrl}
            kilograms={items.kilograms}
            price={items.price}
            title={items.riceVariety}
            name={items.ownersEmail}
            description={items.description}
          >
            {items.reviewStatus && (
              <div className="text-right my-4">
                <span className="font-semibold mr-1">In Progress</span>
                <span className="bg-green-300 rounded-full text-white font-semibold px-0.5" />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
