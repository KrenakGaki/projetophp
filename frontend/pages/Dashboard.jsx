import { Package, Users, ShoppingCart, TrendingUp } from 'lucide-react';

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Produtos</p>
              <p className="text-3xl font-bold text-gray-800">150</p>
            </div>
            <div className="p-4 bg-purple-100 rounded-lg">
              <Package className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Clientes</p>
              <p className="text-3xl font-bold text-gray-800">45</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Vendas</p>
              <p className="text-3xl font-bold text-gray-800">28</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg">
              <ShoppingCart className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Receita</p>
              <p className="text-3xl font-bold text-gray-800">R$ 45.6K</p>
            </div>
            <div className="p-4 bg-orange-100 rounded-lg">
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;