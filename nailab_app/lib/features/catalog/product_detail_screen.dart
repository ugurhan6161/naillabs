import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:nailab_app/core/theme/app_colors.dart';

class ProductDetailScreen extends StatelessWidget {
  const ProductDetailScreen({super.key, required this.slug});

  final String slug;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ürün Detayı'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                height: 260,
                width: double.infinity,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(24),
                  color: AppColors.cream100,
                ),
                child: const Center(
                  child: Icon(
                    Icons.medical_information,
                    size: 96,
                    color: AppColors.roseGoldDark,
                  ),
                ),
              ),
              const SizedBox(height: 20),
              const Text(
                'NAILAB Profesyonel Eğitim Kiti',
                style: TextStyle(fontSize: 30, fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 8),
              const Text(
                'Temel manikür kurslarında eksik kalan profesyonel eğitim kiti.',
                style: TextStyle(fontSize: 15, color: AppColors.secondaryText),
              ),
              const SizedBox(height: 16),
              const Row(
                children: [
                  Text(
                    '₺1.250,00',
                    style: TextStyle(fontSize: 28, fontWeight: FontWeight.w700),
                  ),
                  SizedBox(width: 12),
                  Text(
                    'KDV dahil',
                    style: TextStyle(fontSize: 12, color: AppColors.secondaryText),
                  ),
                ],
              ),
              const SizedBox(height: 20),
              Row(
                children: [
                  Expanded(
                    child: FilledButton(
                      onPressed: () => context.go('/sepet'),
                      child: const Text('Sepete ekle'),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () => context.go('/odeme'),
                      child: const Text('Hemen satın al'),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 28),
              const Text(
                'Kit içeriği',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 12),
              const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _InfoRow(label: '• Anatomik formatta büyük eğitim parmağı'),
                  _InfoRow(label: '• 4 farklı freze ucu'),
                  _InfoRow(label: '• 4 değiştirilebilir tırnak formu'),
                ],
              ),
              const SizedBox(height: 24),
              const Text(
                'Teknik özellikler',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 12),
              const _FeatureCard(
                items: [
                  'Ölçü: 18 x 12 cm',
                  'Malzeme: yüksek kaliteli plastik ve metal',
                  'Öneri: eğitmen, akademi, kurs',
                ],
              ),
              const SizedBox(height: 24),
              const Text(
                'Kargo ve iade',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 12),
              const Text(
                'Kargo teslim süresi 2–4 iş günü. 14 gün içerisinde iade ve değişim yapılabilir.',
                style: TextStyle(color: AppColors.secondaryText),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  const _InfoRow({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(
        label,
        style: const TextStyle(fontSize: 15, color: AppColors.secondaryText),
      ),
    );
  }
}

class _FeatureCard extends StatelessWidget {
  const _FeatureCard({required this.items});

  final List<String> items;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.cream100,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: items
            .map(
              (item) => Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Icon(Icons.check_circle_outline, size: 18, color: AppColors.roseGoldDark),
                    const SizedBox(width: 10),
                    Expanded(child: Text(item)),
                  ],
                ),
              ),
            )
            .toList(),
      ),
    );
  }
}
