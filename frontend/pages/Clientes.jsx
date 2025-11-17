import {useState, useEffect} from 'react';
import {Plus, Edit2, Trash2, X, Users} from 'lucide-react';
import api from '../services/api';

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const[showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        endereco: '',
    });

    useEffect(() => {
        buscarClientes();
    }, []);

    const buscarClientes = () => {
        setLoading(true);
        api.get('/clientes')
            .then(response => {
                setClientes(response.data);
                setLoading(false);
    });
    };

    const handleSubmit = (e) => {
    e.preventDefault();  // ← adiciona ()
    
    if (!formData.nome || !formData.email) {
        alert('Preencha os campos obrigatórios');
        return;
    }

    const requisicao = editando
        ? api.put(`/clientes/${editando.id}`, formData)  // ← adiciona /
        : api.post('/clientes', formData);
    
    requisicao
        .then(response => {
            if (editando) {
                setClientes(prev => prev.map(c => 
                    c.id === editando.id ? response.data : c
                ));
            } else {
                setClientes(prev => [...prev, response.data]);
            }
            resetForm();
            alert('Cliente salvo com sucesso!');
        })
        .catch(err => {
            console.error('Erro:', err);
            alert('Erro ao salvar cliente');
        });
};
    
        const resetForm = () => {
            setFormData({ 
                nome: '',
                email: '',
                telefone: '',
                cpf: '',
                endereco: ''
            });
            setShowModal(false);
            setEditando(null);
        }

        const handleDelete = (id) => {
            if (window.confirm('Deseja exlcuir este cliente?')) {
                api.delete(`/clientes/${id}`)
                    .then (() => {
                        setClientes(prev => prev.filter (c => c.id !== id));
                        alert('Cliente excluido!');
                    })
                    .catch(err => alert('Erro ao excluir'));
                }
            };

        const handleEdit = (cliente) => {
            setFormData(cliente);
            setEditando(cliente);
            setShowModal(true);
        };

        if (loading) return <div>Carregando...</div>
        return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestão de Clientes</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Novo Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientes.map(cliente => (
          <div key={cliente.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{cliente.nome}</h3>
                  <p className="text-sm text-gray-600">{cliente.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(cliente)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(cliente.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            {cliente.telefone && <p className="text-sm text-gray-600">📞 {cliente.telefone}</p>}
            {cliente.cpf && <p className="text-sm text-gray-600">📄 {cliente.cpf}</p>}
          </div>
        ))}
      </div>

      {/* Modal igual ao de produtos, mas com campos de cliente */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editando ? 'Editar Cliente' : 'Novo Cliente'}
              </h2>
              <button onClick={resetForm}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Nome *</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Telefone</label>
                <input
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">CPF</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Endereço</label>
                <textarea
                  name="endereco"
                  value={formData.endereco}
                  onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={resetForm}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-bold"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold"
                >
                  {editando ? 'Atualizar' : 'Cadastrar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
        

}

export default Clientes;