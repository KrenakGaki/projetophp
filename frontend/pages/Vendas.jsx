import { useState, useEffect } from 'react';
import { Plus, Trash2, ShoppingCart } from 'lucide-react';
import api from '../services/api';

function Vendas() {
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState('');

  useEffect(() => {
    buscarProdutos();
    buscarClientes();
  }, []);

  const buscarProdutos = () => {
    api.get('/produtos').then(res => setProdutos(res.data));
  };

  const buscarClientes = () => {
    api.get('/clientes').then(res => setClientes(res.data));
  };

  const adicionarAoCarrinho = (produto) => {
    const itemExistente = carrinho.find(item => item.id === produto.id);
    
    if (itemExistente) {
      if (itemExistente.quantidade < produto.quantidade) {
        setCarrinho(carrinho.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        ));
      } else {
        alert('Estoque insuficiente!');
      }
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  const removerDoCarrinho = (id) => {
    setCarrinho(carrinho.filter(item => item.id !== id));
  };

  const finalizarVenda = () => {
    if (!clienteSelecionado) {
      alert('Selecione um cliente!');
      return;
    }

    if (carrinho.length === 0) {
      alert('Adicione produtos ao carrinho!');
      return;
    }

    const venda = {
      cliente_id: clienteSelecionado,
      itens: carrinho.map(item => ({
        produto_id: item.id,
        quantidade: item.quantidade,
        preco_unitario: item.preco
      }))
    };

    api.post('/vendas', venda)
      .then(() => {
        alert('Venda realizada com sucesso!');
        setCarrinho([]);
        setClienteSelecionado('');
        buscarProdutos(); // Atualiza estoque
      })
      .catch(err => {
        console.error('Erro:', err);
        alert('Erro ao realizar venda');
      });
  };

  const total = carrinho.reduce((acc, item) => 
    acc + (item.preco * item.quantidade), 0
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Coluna 1 e 2: Produtos */}
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Produtos Disponíveis</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {produtos.map(produto => (
            <div key={produto.id} className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800">{produto.nome}</h3>
                <span className="text-sm text-gray-600">
                  Estoque: {produto.quantidade}
                </span>
              </div>
              <p className="text-2xl font-bold text-green-600 mb-3">
                R$ {parseFloat(produto.preco).toFixed(2)}
              </p>
              <button
                onClick={() => adicionarAoCarrinho(produto)}
                disabled={produto.quantidade === 0}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Adicionar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Coluna 3: Carrinho */}
      <div>
        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingCart className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">Carrinho</h2>
          </div>

          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-2">Cliente</label>
            <select
              value={clienteSelecionado}
              onChange={(e) => setClienteSelecionado(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
            >
              <option value="">Selecione...</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3 mb-6">
            {carrinho.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Carrinho vazio
              </p>
            ) : (
              carrinho.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.nome}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantidade}x R$ {item.preco}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-green-600">
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removerDoCarrinho(item.id)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t-2 border-gray-200 pt-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-700">Total:</span>
              <span className="text-3xl font-bold text-green-600">
                R$ {total.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={finalizarVenda}
            disabled={carrinho.length === 0 || !clienteSelecionado}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold shadow-lg disabled:opacity-50"
          >
            Finalizar Venda
          </button>
        </div>
      </div>
    </div>
  );
}

export default Vendas;