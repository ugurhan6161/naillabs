import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:nailab_app/core/theme/app_colors.dart';

class StoreScreen extends StatelessWidget {
  const StoreScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final product = {
      'title': 'NAILAB Profesyonel Eğitim Kiti',
      'price': '₺1.250,00',
      'subtitle': 'Anatomik büyük eğitim parmağı',
    };

    return Scaffold(
      appBar: AppBar(
        title: const Text('Mağaza'),
        actions: [
          IconButton(
            onPressed: () => context.go('/sepet'),
            icon: const Icon(Icons.shopping_bag_outlined),
          ),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Katalog & Koleksiyon',
                style: TextStyle(
                  fontSize: 12,
                  letterSpacing: 2,
                  textBaseline: TextBaseline.alphabetic,
                  color: AppColors.secondaryText,
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Mağaza & Eğitim Ekipmanları',
                style: TextStyle(fontSize: 30, fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 18),
              TextField(
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.search),
                  hintText: 'Ürün ara...',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(999),
                  ),
                ),
              ),
              const SizedBox(height: 18),
              SizedBox(
                height: 44,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  children: const [
                    Chip(label: Text('Tüm ürünler')),
                    Chip(label: Text('Eğitim kitleri')),
                    Chip(label: Text('Aksesuarlar')),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              Expanded(
                child: GridView.count(
                  crossAxisCount: 2,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                  childAspectRatio: 0.72,
                  children: [
                    _ProductCard(product: product),
                    _ProductCard(product: product),
                    _ProductCard(product: product),
                    _ProductCard(product: product),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ProductCard extends StatelessWidget {
  const _ProductCard({required this.product});

  final Map<String, String> product;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: () => context.go('/urun/nailab-kiti'),
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                height: 170,
                width: double.infinity,
                decoration: BoxDecoration(
                  color: AppColors.cream100,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: const Center(
                  child: Icon(Icons.medical_information, size: 56, color: AppColors.roseGoldDark),
                ),
              ),
              const SizedBox(height: 12),
              Text(
                product['title']!,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 6),
              Text(
                product['subtitle']!,
                style: const TextStyle(color: AppColors.secondaryText, fontSize: 13),
              ),
              const Spacer(),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    product['price']!,
                    style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 18),
                  ),
                  FilledButton(
                    onPressed: () => context.go('/urun/nailab-kiti'),
                    child: const Text('İncele'),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
