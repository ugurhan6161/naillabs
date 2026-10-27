import 'package:flutter/material.dart';
import 'package:nailab_app/core/theme/app_colors.dart';

class AccountScreen extends StatelessWidget {
  const AccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Hesabım'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: AppColors.cream100,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Row(
                  children: const [
                    CircleAvatar(
                      radius: 28,
                      backgroundColor: AppColors.black,
                      child: Icon(Icons.person, color: AppColors.cream50),
                    ),
                    SizedBox(width: 16),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Selin Hoca', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600)),
                        Text('selin@nailab.com', style: TextStyle(color: AppColors.secondaryText)),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              const _SectionTitle('Siparişlerim'),
              const SizedBox(height: 8),
              const _OrderCard(),
              const SizedBox(height: 20),
              const _SectionTitle('Adreslerim'),
              const SizedBox(height: 8),
              const _InfoCard('İstanbul / Kadıköy, ...'),
            ],
          ),
        ),
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  const _SectionTitle(this.title);

  final String title;

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Text(title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w500)),
    );
  }
}

class _OrderCard extends StatelessWidget {
  const _OrderCard();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.cream200),
      ),
      child: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Sipariş No: NL-2025-000001', style: TextStyle(fontWeight: FontWeight.w600)),
          SizedBox(height: 6),
          Text('Durum: Kargoya verildi', style: TextStyle(color: AppColors.secondaryText)),
          SizedBox(height: 6),
          Text('Tarih: 18.10.2025', style: TextStyle(color: AppColors.secondaryText)),
        ],
      ),
    );
  }
}

class _InfoCard extends StatelessWidget {
  const _InfoCard(this.text);

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.cream200),
      ),
      child: Text(text),
    );
  }
}
