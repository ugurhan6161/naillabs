import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:nailab_app/core/theme/app_colors.dart';

class CheckoutScreen extends StatelessWidget {
  const CheckoutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ödeme'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Ýletiþim', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w500)),
              const SizedBox(height: 12),
              const TextField(decoration: InputDecoration(labelText: 'E-posta / Telefon')),
              const SizedBox(height: 20),
              const Text('Teslimat adresi', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w500)),
              const SizedBox(height: 12),
              const TextField(decoration: InputDecoration(labelText: 'Adres')),
              const SizedBox(height: 12),
              const TextField(decoration: InputDecoration(labelText: 'Ýl / Ýlçe')),
              const SizedBox(height: 20),
              const Text('Ödeme yöntemi', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w500)),
              const SizedBox(height: 12),
              const Row(
                children: [
                  Chip(label: Text('Kredi kartý')),
                  SizedBox(width: 8),
                  Chip(label: Text('Havale/EFT')),
                ],
              ),
              const SizedBox(height: 20),
              CheckboxListTile(
                value: true,
                onChanged: (_) {},
                title: const Text('Ön Bilgilendirme Formu ve Mesafeli Satýþ Sözleþmesi þartlarýný okudum.'),
                controlAffinity: ListTileControlAffinity.leading,
              ),
              const SizedBox(height: 20),
              SizedBox(
                width: double.infinity,
                child: FilledButton(
                  onPressed: () => context.go('/siparis-tamamlandi/2025-000001'),
                  child: const Text('Sipariþi tamamla'),
                ),
              ),
              const SizedBox(height: 20),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColors.cream100,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: const Column(
                  children: [
                    Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [Text('Ara toplam'), Text('?1.250,00')]),
                    SizedBox(height: 8),
                    Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [Text('Kargo'), Text('?0,00')]),
                    SizedBox(height: 8),
                    Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [Text('Toplam'), Text('?1.250,00', style: TextStyle(fontWeight: FontWeight.w700))]),
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
