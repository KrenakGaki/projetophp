<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VendaItem extends Model
{
    use HasFactory;

    protected $table = 'vendas_itens';

    protected $fillable = [
        'venda_id',
        'produto_id',
        'quantidade',
        'preco_venda',
        'subtotal'
    ];

    public function venda()
    {
        return $this->belongsTo(Venda::class);
    }

    public function produto()
    {
        return $this->belongsTo(Produtos::class, 'produto_id');
    }
}
