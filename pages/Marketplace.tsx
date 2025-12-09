import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../services/mockData';
import { Card, Button, Badge, Modal } from '../components/UI';
import { ProductType, User, Product } from '../types';
import { Search, Filter, Share2, ShoppingCart, Zap, Copy, Check, ExternalLink } from 'lucide-react';

interface MarketplaceProps {
  user: User;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ user }) => {
  const [filter, setFilter] = useState<'ALL' | ProductType>('ALL');
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [linkType, setLinkType] = useState<'PAYMENT' | 'AFFILIATE'>('PAYMENT');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [copied, setCopied] = useState(false);
  
  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    filter === 'ALL' ? true : p.type === filter
  );

  const handleBuy = (product: Product) => {
      const link = `https://pay.flexstore.ao/checkout/${product.id}?buyer=${user.id}`;
      setGeneratedLink(link);
      setLinkType('PAYMENT');
      setSelectedProduct(product);
      setCopied(false);
      setIsLinkModalOpen(true);
  };

  const handleAffiliate = (product: Product) => {
      // Simulate affiliate link generation
      const link = `https://flexstore.ao/p/${product.id}?ref=${user.id}`;
      setGeneratedLink(link);
      setLinkType('AFFILIATE');
      setSelectedProduct(product);
      setCopied(false);
      setIsLinkModalOpen(true);
  };

  const copyToClipboard = () => {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar produtos, cursos ou serviços..." 
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'ALL' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFilter(ProductType.PHYSICAL)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === ProductType.PHYSICAL ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}
          >
            Físicos
          </button>
          <button 
            onClick={() => setFilter(ProductType.DIGITAL)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === ProductType.DIGITAL ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}
          >
            Infoprodutos
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Image */}
            <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-900 overflow-hidden">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3">
                 <Badge color={product.type === ProductType.DIGITAL ? 'blue' : 'yellow'}>
                    {product.type === ProductType.DIGITAL ? 'Digital' : 'Físico'}
                 </Badge>
              </div>
              {product.type === ProductType.PHYSICAL && (
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-700 dark:text-slate-200">
                      Estoque: {product.stock}
                  </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-1 truncate">{product.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 h-10">{product.description}</p>
              
              <div className="flex items-end justify-between mb-4">
                <div>
                  <span className="text-xs text-slate-400">Preço</span>
                  <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {product.price.toLocaleString('pt-AO')} Kz
                  </div>
                </div>
                {product.commissionRate > 0 && (
                  <div className="text-right">
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Comissão</span>
                    <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {product.commissionRate}%
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="text-xs w-full" onClick={() => handleAffiliate(product)}>
                  <Share2 className="w-3 h-3 mr-1" />
                  Afiliar-se
                </Button>
                <Button variant="primary" className="text-xs w-full" onClick={() => handleBuy(product)}>
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Comprar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Link Generation Modal */}
      <Modal 
        isOpen={isLinkModalOpen} 
        onClose={() => setIsLinkModalOpen(false)} 
        title={linkType === 'PAYMENT' ? "Checkout Rápido" : "Link de Afiliado"}
      >
        <div className="space-y-4">
            <div className={`p-4 rounded-lg flex items-center ${linkType === 'PAYMENT' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-200' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-200'}`}>
                {linkType === 'PAYMENT' ? <ShoppingCart className="w-6 h-6 mr-3" /> : <Zap className="w-6 h-6 mr-3" />}
                <div>
                    <h4 className="font-bold text-sm">
                        {linkType === 'PAYMENT' ? `Comprar "${selectedProduct?.title}"` : `Promover "${selectedProduct?.title}"`}
                    </h4>
                    <p className="text-xs opacity-80">
                        {linkType === 'PAYMENT' ? "Use este link para finalizar a compra." : "Ganhe comissões indicando este produto."}
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Link Gerado</label>
                <div className="flex">
                    <input 
                        readOnly 
                        value={generatedLink} 
                        className="flex-1 bg-slate-50 dark:bg-slate-900 border border-r-0 border-slate-300 dark:border-slate-600 rounded-l-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300 outline-none"
                    />
                    <button 
                        onClick={copyToClipboard}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-r-lg flex items-center transition-colors"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
                {copied && <p className="text-xs text-green-600 dark:text-green-400 font-medium">Link copiado para a área de transferência!</p>}
            </div>

            <div className="pt-2 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsLinkModalOpen(false)}>Fechar</Button>
                <Button className="flex-1" onClick={() => window.open(generatedLink, '_blank')}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Abrir Link
                </Button>
            </div>
        </div>
      </Modal>
    </div>
  );
};