import React, { useState } from 'react';
import { Card, Input, Button } from '../components/UI';
import { ProductType } from '../types';
import { Upload, Plus, AlertCircle } from 'lucide-react';

export const ProductManager: React.FC = () => {
  const [productType, setProductType] = useState<ProductType>(ProductType.PHYSICAL);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Adicionar Novo Produto</h1>
        <Button variant="outline">Cancelar</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-medium mb-4">Informações Básicas</h3>
            <div className="space-y-4">
              <Input label="Título do Produto" placeholder="Ex: Curso de Excel Avançado" />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                <textarea className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none h-32" placeholder="Detalhes completos do produto..."></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Produto</label>
                   <select 
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500"
                    value={productType}
                    onChange={(e) => setProductType(e.target.value as ProductType)}
                   >
                     <option value={ProductType.PHYSICAL}>Produto Físico</option>
                     <option value={ProductType.DIGITAL}>Infoproduto (Digital)</option>
                   </select>
                </div>
                <Input label="Preço (Kz)" type="number" placeholder="0.00" />
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-medium mb-4">Configurações de Venda</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productType === ProductType.PHYSICAL && (
                 <Input label="Estoque Disponível" type="number" placeholder="10" />
              )}
              {productType === ProductType.DIGITAL && (
                 <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Arquivo do Infoproduto</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer">
                        <Upload className="w-8 h-8 mb-2" />
                        <span className="text-sm">Clique para upload PDF, ZIP, etc.</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Enviado automaticamente após compra confirmada.</p>
                 </div>
              )}
              
              <div className="md:col-span-2 border-t border-slate-100 pt-4 mt-2">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">Programa de Afiliados</label>
                    <div className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" defaultChecked />
                        <span className="ml-2 text-sm text-slate-600">Permitir afiliados</span>
                    </div>
                </div>
                <Input label="Comissão por Venda (%)" type="number" placeholder="10" />
                <p className="text-xs text-slate-500 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Afiliados ganham esta % sobre o valor total da venda.
                </p>
              </div>
            </div>
          </Card>
          
          <Button className="w-full h-12 text-lg">
             <Plus className="w-5 h-5 mr-2" />
             Publicar Produto
          </Button>
        </div>

        {/* Sidebar/Preview */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h3 className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wider">Mídia</h3>
            <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center mb-3">
                 <span className="text-slate-400 text-sm">Preview da Imagem Principal</span>
            </div>
            <Button variant="outline" className="w-full">Adicionar Fotos</Button>
          </Card>
          
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
             <h4 className="font-bold text-indigo-900 mb-2">Dica FlexStore</h4>
             <p className="text-sm text-indigo-700">
                Produtos com descrição detalhada e boas fotos vendem 3x mais. Se for infoproduto, descreva o que o aluno vai aprender.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};