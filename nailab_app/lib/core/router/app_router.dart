import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:nailab_app/features/account/account_screen.dart';
import 'package:nailab_app/features/admin/admin_dashboard_screen.dart';
import 'package:nailab_app/features/auth/auth_screen.dart';
import 'package:nailab_app/features/cart/cart_screen.dart';
import 'package:nailab_app/features/catalog/product_detail_screen.dart';
import 'package:nailab_app/features/catalog/store_screen.dart';
import 'package:nailab_app/features/checkout/checkout_screen.dart';
import 'package:nailab_app/features/content/content_screen.dart';

class AppRouter {
  static final router = GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(path: '/', builder: (context, state) => const HomeScreen()),
      GoRoute(path: '/magaza', builder: (context, state) => const StoreScreen()),
      GoRoute(
        path: '/urun/:slug',
        builder: (context, state) {
          final slug = state.pathParameters['slug'] ?? 'nailab-kiti';
          return ProductDetailScreen(slug: slug);
        },
      ),
      GoRoute(path: '/sepet', builder: (context, state) => const CartScreen()),
      GoRoute(path: '/odeme', builder: (context, state) => const CheckoutScreen()),
      GoRoute(path: '/giris', builder: (context, state) => const AuthScreen()),
      GoRoute(path: '/hesabim', builder: (context, state) => const AccountScreen()),
      GoRoute(path: '/admin', builder: (context, state) => const AdminDashboardScreen()),
      GoRoute(
        path: '/:slug',
        builder: (context, state) => ContentScreen(slug: state.pathParameters['slug'] ?? 'hakkimizda'),
      ),
    ],
  );
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
                Text('NAILAB', style: TextStyle(fontSize: 40, fontWeight: FontWeight.w700)),
                SizedBox(height: 16),
                Text('Vitrin ekraný hazýrlanýyor...'),
                SizedBox(height: 24),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
