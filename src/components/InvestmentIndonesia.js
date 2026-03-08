'use client';

const investments = [
	{
		icon: '📈',
		name: 'Reksa Dana',
		desc: 'Mulai dari Rp 10.000',
		return: '5–15% / tahun',
		risk: 'Rendah–Sedang',
		riskColor: '#22c55e',
		bg: '#f0fdf4',
		border: '#86efac',
	},
	{
		icon: '🏦',
		name: 'Deposito',
		desc: 'Dijamin LPS hingga Rp 2 M',
		return: '4–6% / tahun',
		risk: 'Sangat Rendah',
		riskColor: '#16a34a',
		bg: '#f0fdf4',
		border: '#4ade80',
	},
	{
		icon: '🇮🇩',
		name: 'SBN / ORI',
		desc: 'Obligasi Negara Ritel',
		return: '6–7% / tahun',
		risk: 'Rendah',
		riskColor: '#2563eb',
		bg: '#eff6ff',
		border: '#93c5fd',
	},
	{
		icon: '🥇',
		name: 'Emas',
		desc: 'Antam / Tabungan Emas',
		return: '8–12% / tahun',
		risk: 'Rendah–Sedang',
		riskColor: '#d97706',
		bg: '#fffbeb',
		border: '#fcd34d',
	},
	{
		icon: '📊',
		name: 'Saham',
		desc: 'BEI – Bursa Efek Indonesia',
		return: '10–20%+ / tahun',
		risk: 'Tinggi',
		riskColor: '#dc2626',
		bg: '#fff1f2',
		border: '#fca5a5',
	},
	{
		icon: '₿',
		name: 'Kripto',
		desc: 'Terdaftar di OJK/Bappebti',
		return: 'Sangat Variatif',
		risk: 'Sangat Tinggi',
		riskColor: '#9333ea',
		bg: '#faf5ff',
		border: '#d8b4fe',
	},
];

export default function InvestmentIndonesia() {
	return (
		<div className="w-full max-w-xl rounded-xl overflow-hidden border-2" style={{ borderColor: '#ce1126' }}>
			<style>{`
				@keyframes rupiah-pulse {
					0%, 100% { transform: scale(1); }
					50% { transform: scale(1.08); }
				}
				@keyframes flag-wave {
					0%, 100% { transform: skewX(0deg); }
					25% { transform: skewX(-3deg); }
					75% { transform: skewX(3deg); }
				}
				.rupiah-icon { animation: rupiah-pulse 2s ease-in-out infinite; display: inline-block; }
				.flag-wave { animation: flag-wave 3s ease-in-out infinite; display: inline-block; }
				.inv-card {
					transition: transform 0.15s ease, box-shadow 0.15s ease;
				}
				.inv-card:hover {
					transform: translateY(-2px);
					box-shadow: 0 4px 12px rgba(0,0,0,0.12);
				}
			`}</style>

			{/* Header */}
			<div
				style={{
					background: 'linear-gradient(135deg, #ce1126 0%, #ffffff 50%, #ce1126 100%)',
					padding: '20px 16px 16px',
					textAlign: 'center',
				}}
			>
				<div style={{ fontSize: '2.4rem', marginBottom: '6px' }}>
					<span className="flag-wave">🇮🇩</span>
					<span className="rupiah-icon" style={{ marginLeft: '8px' }}>💰</span>
				</div>
				<h2 style={{
					fontSize: 'clamp(1.3rem, 6vw, 1.8rem)',
					fontWeight: '900',
					color: '#ce1126',
					letterSpacing: '0.02em',
					textShadow: '0 1px 2px rgba(255,255,255,0.8)',
					margin: 0,
				}}>
					Investasi untuk Indonesia
				</h2>
				<p style={{ color: '#7f1d1d', fontSize: '0.85rem', margin: '4px 0 0', fontWeight: '600' }}>
					Mulai berinvestasi hari ini 🚀
				</p>
			</div>

			{/* Cards */}
			<div style={{ background: '#fff', padding: '12px 12px 16px' }}>
				<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
					{investments.map((inv) => (
						<div
							key={inv.name}
							className="inv-card"
							style={{
								background: inv.bg,
								border: `1.5px solid ${inv.border}`,
								borderRadius: '10px',
								padding: '12px 10px',
							}}
						>
							<div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>{inv.icon}</div>
							<div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#111', marginBottom: '2px' }}>{inv.name}</div>
							<div style={{ fontSize: '0.72rem', color: '#555', marginBottom: '6px', lineHeight: '1.3' }}>{inv.desc}</div>
							<div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#1d4ed8' }}>⬆ {inv.return}</div>
							<div style={{
								display: 'inline-block',
								marginTop: '4px',
								background: inv.riskColor,
								color: '#fff',
								fontSize: '0.65rem',
								fontWeight: '700',
								padding: '2px 7px',
								borderRadius: '999px',
							}}>
								{inv.risk}
							</div>
						</div>
					))}
				</div>

				{/* Footer tip */}
				<div style={{
					marginTop: '12px',
					background: '#fef9c3',
					border: '1.5px solid #fde047',
					borderRadius: '8px',
					padding: '10px 12px',
					fontSize: '0.78rem',
					color: '#713f12',
					lineHeight: '1.5',
				}}>
					💡 <strong>Tips:</strong> Diversifikasi portofolio Anda. Sesuaikan pilihan investasi dengan profil risiko dan tujuan keuangan Anda.
				</div>
			</div>
		</div>
	);
}
